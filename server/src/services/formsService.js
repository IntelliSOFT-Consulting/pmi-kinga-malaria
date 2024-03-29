import axios from "axios";
import { config } from "dotenv";
import XLSX from "xlsx";
import { removeEmpty, flattenObject, filterTestSubmissions, getProjectId } from "../lib/utils";
import { format } from "date-fns";
import matchCorrectiveAction from "../templates/correctiveActions";

config();

export const getForms = async (isTest, token) => {
  try {
    const projectId = getProjectId(isTest);
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    // throw new Error({ error: error.message });
  }
};

export const getForm = async (isTest, token, formId) => {
  try {
    const projectId = getProjectId(isTest);
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms/${formId}.xlsx`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms/${formId}.xls`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
};

// get form schema
export const getFormSchema = async (isTest, token, formId) => {
  try {
    const projectId = getProjectId(isTest);
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms/${formId}/fields`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

export const getFormXlsx = async (isTest, token, formId) => {
  try {
    const projectId = getProjectId(isTest);
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms/${formId}.xlsx`, {
      headers: {
        Authorization: token,
      },
      responseType: "arraybuffer",
    });
    return data;
  } catch (error) {
    const { data } = await axios.get(`${process.env.SERVER_URL}/v1/projects/22/forms/${formId}.xls`, {
      headers: {
        Authorization: token,
      },
      responseType: "arraybuffer",
    });
    return data;
  }
};

export const convertFormXlsxToJson = async (formXlsx) => {
  try {
    const workbook = XLSX.read(formXlsx, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    const formFields = await removeEmpty(json);

    return formFields;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const periods = {
  from: new Date(),
  to: new Date(),
};

const getRepeats = async (token, link) => {
  const { data } = await axios.get(link, {
    headers: {
      Authorization: token,
    },
  });
  return data.value || [];
};

export const getFormSubmissions = async (isTest, token, formId, period = periods) => {
  try {
    period.from = format(new Date(period.from), "yyyy-MM-dd");
    period.to = format(new Date(period.to), "yyyy-MM-dd");
    const projectId = getProjectId(isTest);
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/v1/projects/22/forms/${formId}.svc/Submissions?$filter=__system/submissionDate ge ${period.from}T00:00:00Z and __system/submissionDate le ${period.to}T23:59:59Z`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    let result = [];
    if (data.value) {
      result = await Promise.all(
        data.value?.map(async (item) => {
          return flattenObject(item);
        })
      );
    }
    return filterTestSubmissions(result, isTest);
  } catch (error) {
    console.log(error);
    throw new Error({ error: error.message });
  }
};

export const getCorrectiveActions = async (formFields, submissions, formName = "") => {
  try {
    const correctiveActions = await submissions
      .map((item) => {
        item = flattenObject(item);
        const keys = Object.keys(item);
        const correctiveAction = keys.filter((key) => key.includes("_Action")).filter((key) => item[key] === "ok");

        return correctiveAction.map((key) => ({
          "Date of inspection": format(new Date(item.submissionDate), "yyyy-MM-dd"),
          "Date and time submitted": format(new Date(item.submissionDate), "yyyy-MM-dd HH:mm a"),
          "Form name": formName,
          County: item.county_other || item.county,
          "Sub-County": item.sub_county_other || item.sub_county,
          Ward: item.ward_other || item.ward,
          "Operations Site": item.operations_site_other || item.operations_site,
          "Inspector names": item?.inspectors_repeat?.map((item) => item.inspectors_other || item.inspectors)?.join(", "),
          key,
        }));
      })
      .flat();

    const formattedCorrectiveActions = correctiveActions.map((key) => {
      const actionQuestion = formFields.find((field) => field.name === key.key);
      const question = formFields.find((field) => field.name === actionQuestion?.relevant?.match(/\${(.*?)}/)[1]);
      delete key.key;
      const matched = matchCorrectiveAction(actionQuestion?.hint);
      return {
        ...key,
        "Form question": question?.label,
        "Red flag warning": actionQuestion?.hint,
        "Responsible for resolution": matched?.responsible || "County Coordinator",
      };
    });

    return formattedCorrectiveActions;
  } catch (error) {
    console.log(error);
    throw new Error({ error: error.message });
  }
};
