import * as scheduleService from '../services/scheduleService';

export const updateSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;
    const updatedSchedule = await scheduleService.updateSchedule(schedule);
    res.status(200).send(updatedSchedule);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getSchedules();
    res.status(200).send(schedules);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getMailList = async (req, res) => {
  try {
    const mailList = await scheduleService.getMailList();
    res.status(200).send(mailList);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
