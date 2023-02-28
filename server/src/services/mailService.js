import { getSubmissions, supervisoryReport } from './reportService';
import { format } from 'date-fns';
import { config } from 'dotenv';
import XLSX from 'xlsx';
import sendEmail from '../lib/mail';
import { login } from './authService';
import { getReports, latePmtReport } from './pmtReportService';
import Report from '../models/reports';

config();

const createAttachment = (report, name) => {
  const base64 = Buffer.from(report).toString('base64');
  return {
    filename: `${name}.xlsx`,
    content: base64,
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    encoding: 'base64',
  };
};

export const supervisoryEmail = async recipients => {
  try {
    const email = process.env.CENTRAL_EMAIL;
    const password = process.env.CENTRAL_PASSWORD;

    const token = await login({ email, password });
    const report = await supervisoryReport(
      'no',
      token,
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd')
    );

    if (report.length === 0) {
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(report);
    XLSX.utils.book_append_sheet(wb, ws, 'Supervisory Report');
    const xlsx = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const attachments = [createAttachment(xlsx, 'supervisory_report')];

    await sendEmail(
      recipients,
      'Supervisory Report',
      'Supervisory Report',
      attachments
    );
  } catch (error) {
    console.log(error);
  }
};

export const latePmtEmail = async recipients => {
  try {
    // check if the report has been sent today
    const today = format(new Date(), 'yyyy-MM-dd');
    const reportsList = await Report.find({
      date: {
        $gte: new Date(today),
      },
      test_yn: 'no',
    });

    if (!reportsList.length) return;

    const report = await latePmtReport(reportsList, today);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(report);
    XLSX.utils.book_append_sheet(wb, ws, 'Late PMT');
    const xlsx = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const attachments = [createAttachment(xlsx, 'late_pmt')];

    await sendEmail(recipients, 'Late PMT', 'Late PMT', attachments);
  } catch (error) {
    console.log(error);
  }
};

export const pmtEmail = async recipients => {
  try {
    const email = process.env.CENTRAL_EMAIL;
    const password = process.env.CENTRAL_PASSWORD;

    const token = await login({ email, password });
    const report = await pmtReport(
      'no',
      token,
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd')
    );

    if (report.length === 0) {
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(report);
    XLSX.utils.book_append_sheet(wb, ws, 'PMT');
    const xlsx = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const attachments = [createAttachment(xlsx, 'pmt')];

    await sendEmail(recipients, 'PMT', 'PMT', attachments);
  } catch (error) {
    console.log(error);
  }
};

export const submissionByFormEmail = async recipients => {
  try {
    const email = process.env.CENTRAL_EMAIL;
    const password = process.env.CENTRAL_PASSWORD;

    const token = await login({ email, password });
    const report = await getSubmissions(
      'no',
      token,
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd')
    );

    if (report.length === 0) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(report);
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions By Form');

    const xlsx = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const attachments = [createAttachment(xlsx, 'submission_by_form')];

    await sendEmail(
      recipients,
      'Submission By Form',
      'Submission By Form',
      attachments
    );
  } catch (error) {
    console.log(error);
  }
};

export const smsIndicatorEmail = async recipients => {
  try {
    const report = await getReports(
      'no',
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd')
    );

    if (report.length === 0) return;

    const wb = XLSX.utils.book_new();
    report.forEach(sheet => {
      const ws = XLSX.utils.json_to_sheet(sheet.content, {
        header: sheet.columns,
      });
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheet);
    });

    const xlsxBase64 = XLSX.write(wb, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    const attachments = [createAttachment(xlsxBase64, 'sms_indicator')];

    await sendEmail(recipients, 'SMS Indicator', 'SMS Indicator', attachments);
  } catch (error) {
    console.log(error);
  }
};
