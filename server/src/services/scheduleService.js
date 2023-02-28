import Schedule from '../models/schedules';
import MailList from '../models/mailList';

export const updateRecipients = async recipients => {
  const newRecipients = await Promise.all(
    recipients.map(async recipient => {
      const foundRecipient = await MailList.findOne({ email: recipient });
      if (!foundRecipient) {
        const newRecipient = await MailList.create({ email: recipient });
        return newRecipient._id;
      } else {
        return foundRecipient._id;
      }
    })
  );
  return newRecipients;
};

export const createSchedule = async schedule => {
  const { report, frequency, day, recurring, time, recipients } = schedule;

  const newRecipients = await updateRecipients(recipients);

  const newSchedule = await Schedule.create({
    report,
    frequency,
    day,
    recurring,
    time,
    recipients: newRecipients,
  });

  return newSchedule;
};

export const getSchedules = async () => {
  const schedules = await Schedule.find().populate('recipients');
  return schedules;
};

export const getScheduleByReport = async report => {
  const schedule = await Schedule.findOne({ report });
  return schedule;
};

export const getScheduleById = async id => {
  const schedule = await Schedule.findById(id);
  return schedule;
};

export const updateSchedule = async schedule => {
  const { recipients } = schedule;

  const newRecipients = await updateRecipients(recipients);
  const updatedSchedule = await Schedule.findByIdAndUpdate(
    schedule._id,
    { ...schedule, recipients: newRecipients },
    { new: true }
  );
  return updatedSchedule;
};

export const getMailList = async () => {
  const mailList = await MailList.find();
  return mailList;
}