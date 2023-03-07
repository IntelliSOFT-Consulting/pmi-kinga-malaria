import { login } from '../services/authService';
import { supervisoryReport, getSubmissions } from '../services/reportService';

const { CENTRAL_EMAIL, CENTRAL_PASSWORD } = process.env;

export const getSupervisoryReport = async (req, res) => {
  const { test_yn = 'no', from, to } = req.query;
  const token = await login({
    email: CENTRAL_EMAIL,
    password: CENTRAL_PASSWORD,
  });

  try {
    const report = await supervisoryReport(test_yn, token, from, to);
    res.send(report);
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).send(message);
  }
};

export const getSubmissionsByForm = async (req, res) => {
  const { test_yn = 'no', from, to } = req.query;
  const token = await login({
    email: CENTRAL_EMAIL,
    password: CENTRAL_PASSWORD,
  });
  try {
    const report = await getSubmissions(test_yn, token, from, to);
    res.send(report);
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).send(message);
  }
};
