import Report from '../models/reports';
import * as pmtReportService from '../services/pmtReportService';
import telerivet from '../config/telerivet';
import OrganizationUnit from '../models/organizationUnits';

export const createReport = async (req, res) => {
  const { content, secret, contact } = req.body;
  const { phone_number } = contact;

  try {
    if (secret === process.env.TR_SECRET && content?.includes('A.')) {
      const data = content.split('.');
      const totalSop = data[1];
      const totalStructures = data[2];
      const sprayedStructures = data[3];
      const sachets = data[4];
      const facility = data[5];
      const date = data[6] ? new Date(data[6]) : new Date();
      const test_yn = data[7] === 'yes' ? 'no' : 'yes';

      const location = OrganizationUnit.findOne({ name: facility });

      const report = new Report({
        user: phone_number,
        totalSop,
        totalStructures,
        sprayedStructures,
        sachets,
        facility: location._id,
        county: location.county,
        subCounty: location.subCounty,
        ward: location.ward,
        date,
        test_yn,
      });

      await report.save();
      await telerivet.sendMessage(
        {
          content: `The report for ${facility} has been submitted successfully.`,
          to_number: phone_number,
        },
        function (err, message) {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          console.log(message);
        }
      );

      res.send(report);
    } else {
      res.send('invalid secret');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


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
