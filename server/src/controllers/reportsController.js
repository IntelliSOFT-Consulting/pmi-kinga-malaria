import { supervisoryReport, getSubmissions } from '../services/reportService';

export const getSupervisoryReport = async (req, res) => {
  const { test_yn = 'no', from, to } = req.query;
  const token = req.token;
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
  const token = req.token;
  try {
    const report = await getSubmissions(test_yn, token, from, to);
    res.send(report);
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).send(message);
  }
};
