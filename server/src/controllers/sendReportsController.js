import Schedule from '../models/schedules';
import { format } from 'date-fns';
import {
  supervisoryEmail,
  submissionByFormEmail,
} from '../services/mailService';

const checkForReports = async (report, emails) => {
  switch (report) {
    case 'Supervisory Report':
      return await supervisoryEmail(emails);
    case 'Submissions By Form':
      return await submissionByFormEmail(emails);
    default:
      return;
  }
};

const sendReports = async () => {
  const schedules = await Schedule.find({}).populate('recipients');
  schedules.forEach(async schedule => {
    const { frequency, report, day, time } = schedule;
    const emails = schedule.recipients?.map(item => item.email);
    const now = format(new Date(), 'HH:mm');
    switch (frequency) {
      case 'daily':
        if (time === now) {
          return checkForReports(report, emails);
        }
        break;
      case 'weekly':
        const today = format(new Date(), 'EEEE');
        if (time === now && today === day) {
          return checkForReports(report, emails);
        }
        break;
      case 'monthly':
        const startDay = format(new Date(), 'dd');
        if (time === now && startDay === day) {
          return checkForReports(report, emails);
        }
        break;
      default:
        break;
    }
  });
};

export default sendReports;
