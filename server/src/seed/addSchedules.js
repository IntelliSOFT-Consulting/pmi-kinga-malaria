import Schedule from "../models/schedules";
import MailList from "../models/mailList";
import { updateRecipients } from "../services/scheduleService";

const newschedules = [
  {
    report: "Supervisory Report",
    frequency: "daily",
    day: "",
    recurring: true,
    time: "20:00",
    recipients: [],
  },
  // {
  //   report: 'SMS Reports',
  //   frequency: 'daily',
  //   day: '',
  //   recurring: true,
  //   time: '20:00',
  //   recipients: [],
  // },
  {
    report: "Submissions By Form",
    frequency: "weekly",
    day: "Friday",
    recurring: true,
    time: "20:00",
    recipients: [],
  },
  // {
  //   report: 'Late PMT',
  //   frequency: 'daily',
  //   day: '',
  //   recurring: true,
  //   time: '18:00',
  //   recipients: [],
  // },
];

export default async function addSchedules() {
  try {
    const mailers = await MailList.find();
    const schedules = await Schedule.find();

    if (schedules.length === 0) {
      const updatedSchedule = newschedules.map((schedule) => {
        const recipients = mailers.map((recipient) => recipient._id);
        return { ...schedule, recipients };
      });

      await Schedule.insertMany(updatedSchedule);
    }
  } catch (error) {
    console.log(error);
  }
}
