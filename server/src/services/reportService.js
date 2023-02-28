import { deepFlattenArray } from '../lib/utils';
import * as auth from './authService';
import * as formService from './formsService';
import OrgUnit from '../models/organizationUnits';

export const supervisoryReport = async (isTest, token, from, to) => {
  const forms = await formService.getForms(isTest, token);
  const actions = await Promise.all(
    forms.map(async formItem => {
      const formId = formItem.xmlFormId;

      const formXlsx = await formService.getFormXlsx(isTest, token, formId);
      const form = await formService.convertFormXlsxToJson(formXlsx);
      const submissions = await formService.getFormSubmissions(
        isTest,
        token,
        formId,
        { from, to }
      );

      const correctivaActions = await formService.getCorrectiveActions(
        form,
        submissions,
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
        return (
          item.form === form &&
          item.inspectors.includes(inspector?.supervisor?.name)
        );
      });
      return {
        form,
        inspector: `${inspector?.name} "${inspector?.supervisor?.name}"`,
        total: formSubmissions.length,
      };
    });

    const data = {};
    data.User = `${inspector?.name} "${inspector?.supervisor?.name}"`;
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
      const submissions = await formService.getFormSubmissions(
        isTest,
        token,
        formId,
        { from, to }
      );
      return submissions.map(item => ({
        form: formItem.name,
        inspectors: item?.inspectors_repeat?.map(
          item => item.inspectors_other || item.inspectors
        ),
      }));
    })
  );
  const result = deepFlattenArray(submissions);
  // remove numbering in form name e.g 1. Form Name
  const formNames = forms.map(item => item.name.replace(/^\d+\./, '')?.trim());
  const inspectors = await OrgUnit.find({ supervisor: { $exists: true } })
    .select('name supervisor -_id')
    .populate('supervisor', 'name -_id');

  const inspectorSubmissions = await submissionByForm(
    formNames,
    inspectors,
    result
  );
  return inspectorSubmissions;
};
