import axios from "axios";
import {config} from "dotenv";
import Submission from "../models/submissions";
import {flattenObject} from "../lib/utils";
import {login} from "../services/authService";
import {getForms} from "../services/formsService";

config();

const {SERVER_URL, CENTRAL_PROJECT_TEST_ID, CENTRAL_EMAIL, CENTRAL_PASSWORD} = process.env;

const getFormSubmissions = async (formId) => {
    const token = await login({email: CENTRAL_EMAIL, password: CENTRAL_PASSWORD});
    console.log("Getting submissions...", CENTRAL_PROJECT_TEST_ID, formId);
    const response = await axios.get(`${SERVER_URL}/v1/projects/1/forms/${formId}.svc/Submissions`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data?.value || [];
};

export const main = async () => {
    const token = await login({
        email: CENTRAL_EMAIL,
        password: CENTRAL_PASSWORD,
    });
    const forms = await getForms("no", token);

    console.log('FORMS', forms)

    forms?.forEach(async (form) => {
        populateSupervisors(token, form);
    });
};

const populateSupervisors = async (token, form) => {
    try {
        const formId = form.xmlFormId;
        const allSubmissions = await getFormSubmissions(formId);
        const submissions = await filterSubmissions(allSubmissions, formId);
        const datas = [];

        const repeats = await getSupervisors(token, formId);

        if (submissions.length) {
            let count = 0;
            const delay = 1000;

            if (count < submissions.length) {
                submissions[count] = flattenObject(submissions[count]);
                const intervalId = setInterval(async () => {
                    const inspectors = submissions[count]?.["inspectors_repeat@odata.navigationLink"];

                    if (inspectors) {
                        const regex = /'([^']+)'/;

                        // Extract the value using the regular expression
                        const match = inspectors.match(regex);

                        // Check if there is a match and get the value
                        const inspectorsUid = match ? match[1] : null;
                        const profileDetails = repeats.filter((inspector) => inspector["__Submissions-id"] === inspectorsUid);

                        if (submissions[count]) {
                            submissions[count]["inspectors_repeat"] = profileDetails;
                            submissions[count].submission = flattenObject(submissions[count]);
                            submissions[count].formId = formId;
                            submissions[count].formName = form.name;
                            await Submission.create(submissions[count]);
                        }
                        count++;
                        if (count === submissions.length) {
                            clearInterval(intervalId);
                        }
                    } else {
                        if (submissions[count]) {
                            submissions[count].submission = flattenObject(submissions[count]);
                            submissions[count].formId = formId;
                            submissions[count].formName = form.name;
                            await Submission.create(submissions[count]);
                            count++;
                        }
                    }
                }, delay);
            }
        }
        return datas;
    } catch (error) {
        console.log(error);
    }
};

const getSupervisors = async (token, formId) => {
    try {
        const {data} = await axios.get(`${SERVER_URL}/v1/projects/1/forms/${formId}.svc`, {
            headers: {
                Authorization: token,
            },
        });

        const repeat = data?.value?.find((item) => item.name?.includes("inspectors_repeat"));


        if(!repeat) return []

        const link = `${SERVER_URL}/v1/projects/1/forms/${formId}.svc/${repeat.url}`;
        const response = await axios.get(link, {
            headers: {
                Authorization: token,
            },
        });
        return response.data?.value || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

const filterSubmissions = async (submissions, formId) => {
    const submissionIds = submissions.map((submission) => submission.__id);
    const existingSubmissions = await Submission.find({
        "submission.__id": {$in: submissionIds},
        formId,
    });

    const existingSubmissionIds = existingSubmissions.map((submission) => submission.submission.__id);

    const newSubmissions = submissions.filter((submission) => !existingSubmissionIds.includes(submission.__id));

    return newSubmissions;
};
