import { deepFlattenArray } from '../lib/utils';
import * as formService from './formsService';
import Inspector from '../models/inspectors';
import Submission from '../models/submissions';

export const supervisoryReport = async (isTest, token, from, to) => {
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
  const inspectorSubmissions = inspectors.map(inspector => {
    const inspectorSubmissions = forms.map(form => {
      const formSubmissions = submissions.filter(item => {
        return item.form === form && item.inspectors.includes(inspector?.name);
      });
      return {
        form,
        inspector: `${inspector?.name} "${inspector?.location}"`,
        total: formSubmissions.length,
      };
    });

    const data = {};
    data.User = `${inspector?.name} "${inspector?.location}"`;
    const total = inspectorSubmissions.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    inspectorSubmissions.forEach(item => {
      data[item.form] = item.total;
    });
    data['All Forms'] = total;
    return data;
  });
  return inspectorSubmissions;
};

export const getSubmissions = async (isTest, token, from, to) => {
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
      });
      const submissionsList = allSubmissions.map(item => item.submission);


      const list =  submissionsList.map(item => ({
        form: formItem.name,
        inspectors: item?.inspectors_repeat?.map(
          item => item.inspectors_other || item.inspectors
        ),
      }));
      return list;
    })
  );

  const result = deepFlattenArray(submissions);
  // remove numbering in form name e.g 1. Form Name
  const formNames = forms.map(item => item.name.replace(/^\d+\./, '')?.trim());
  const inspectors = await Inspector.find({});

  const inspectorSubmissions = await submissionByForm(
    formNames,
    inspectors,
    result
  );
  return inspectorSubmissions;
};
