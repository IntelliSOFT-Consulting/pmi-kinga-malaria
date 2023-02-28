import Report from '../models/reports';
import * as pmtReportService from '../services/pmtReportService';

export const getPmtReport = async (req, res) => {
  const { test_yn = 'no', from, to } = req.query;

  try {
    const report = await pmtReportService.getReports(test_yn, from, to);
    res.send(report);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const latePmtReport = async (req, res) => {
  const { test_yn = 'no', from } = req.query;

  const today = from
    ? new Date(new Date(from).setHours(0, 0, 0, 0))
    : new Date(new Date().setHours(0, 0, 0, 0));

  try {
    // get all reports that are not tests and are after today
    const reports = await Report.find({
      test_yn,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    const report = reports.length
      ? await pmtReportService.latePmtReport(reports, today)
      : [];
    res.send(report);
  } catch (error) {
    res.status(500).send(error);
  }
};
