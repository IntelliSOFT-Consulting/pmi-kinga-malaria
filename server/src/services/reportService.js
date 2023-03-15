import { deepFlattenArray } from '../lib/utils';
import * as formService from './formsService';
import Inspector from '../models/inspectors';
import Submission from '../models/submissions';

export const supervisoryReport = async (isTest, token, from, to, county='') => {
  const forms = await formService.getForms(isTest, token);

  const actions = await Promise.all(
    forms.map(async formItem => {
      const formId = formItem.xmlFormId;

      const formXlsx = await formService.getFormXlsx(isTest, token, formId);
      const form = await formService.convertFormXlsxToJson(formXlsx);

      const submissions = await Submission.find({
        formId,
        'submission.submissionDate': {
          $gte: `${from}T00:00:00Z`,
          $lte: `${to}T23:59:59Z`,
        },
        'submission.county': { $regex: county, $options: 'i' },
      });

      const submissionsList = submissions.map(item => item.submission);

      const correctivaActions = await formService.getCorrectiveActions(
        form,
        submissionsList,
        formItem.name
      );
      return correctivaActions;
    })
  );
  return deepFlattenArray(actions);
};

const submissionByForm = async (forms, inspectors = [], submissions = []) => {
  
  const inspectorArray = submissions.map(item => item?.inspectors);
  const inspectorNames = deepFlattenArray(inspectorArray).filter(
    (item, index, self) => item && self.indexOf(item) === index
  );

  const inspectorSubmissions = inspectorNames.map(inspector => {
    const inspectorSubmissions = forms.map(form => {
      const formSubmissions = submissions.filter(item => {
        return item.form === form && item?.inspectors?.includes(inspector);
      });
      const inspectorItem = inspectors.find(item => item.name === inspector);
      const location = inspectorItem?.location?.trim();
      return {
        form,
        inspector: `${inspector} ${location ? `"${location}"` : ''}`,
        total: formSubmissions.length,
      };
    });

    const data = {};
    const inspectorItem = inspectors.find(item => item.name === inspector);
    const location = inspectorItem?.location?.trim();
    data.User = `${inspector} ${location ? `"${location}"` : ''}`;
    const total = inspectorSubmissions.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    inspectorSubmissions.forEach(item => {
      data[item.form] = item.total;
    });
    data['All Forms'] = total;
    return data;
  });
  return inspectorSubmissions?.sort((a, b) => b['All Forms'] - a['All Forms']);
};

export const getSubmissions = async (isTest, token, county='', from, to) => {
  const forms = await formService.getForms(isTest, token);
  const submissions = await Promise.all(
    forms.map(async formItem => {
      const formId = formItem.xmlFormId;
      const allSubmissions = await Submission.find({
        formId,
        'submission.submissionDate': {
          $gte: `${from}T00:00:00Z`,
          $lte: `${to}T23:59:59Z`,
        },
        'submission.county': { $regex: county, $options: 'i' },
      });
      const submissionsList = allSubmissions.map(item => item.submission);


      const list = submissionsList.map(item => ({
        form: formItem.name?.replace(/^\d+\./, '')?.trim(),
        inspectors: item?.inspectors_repeat?.map(
          item => item.inspectors_other || item.inspectors
        ).filter(item => item),
      }));
      return list;
    })
  );

  const result = deepFlattenArray(submissions);
  const formNames = forms.map(item => item.name.replace(/^\d+\./, '')?.trim());
  const inspectors = await Inspector.find({});

  const inspectorSubmissions = await submissionByForm(
    formNames,
    inspectors,
    result
  );
  return inspectorSubmissions;
};
