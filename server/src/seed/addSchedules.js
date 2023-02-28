import Schedule from '../models/schedules';
import { updateRecipients } from '../services/scheduleService';

const schedules = [
  {
    report: 'Supervisory Report',
    frequency: 'daily',
    day: '',
    recurring: true,
    time: '20:00',
    recipients: ['pnyatindo@intellisoftkenya.com'],
  },
  {
    report: 'SMS Reports',
    frequency: 'daily',
    day: '',
    recurring: true,
    time: '20:00',
    recipients: ['pnyatindo@intellisoftkenya.com'],
  },
  {
    report: 'Submissions By Form',
    frequency: 'weekly',
    day: 'Friday',
    recurring: true,
    time: '20:00',
    recipients: ['pnyatindo@intellisoftkenya.com'],
  },
  {
    report: 'Late PMT',
    frequency: 'daily',
    day: '',
    recurring: true,
    time: '18:00',
    recipients: ['pnyatindo@intellisoftkenya.com'],
  },
];

export default async function addSchedules() {
  try {
    const schedule = await Schedule.find({});
    const updatedSchedule = await Promise.all(
      schedules.map(async schedule => {
        const { recipients } = schedule;
        const newRecipients = await updateRecipients(recipients);
        return { ...schedule, recipients: newRecipients };
      })
    );
    if (schedule.length === 0) {
      await Schedule.insertMany(updatedSchedule);
    }
  } catch (error) {
    console.log(error);
  }
}
