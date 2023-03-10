import * as scheduleService from '../services/scheduleService';
import { format } from 'date-fns';

export const updateSchedule = async (req, res) => {
  try {
    if (req.body.time) {
      req.body.time = format(new Date(req.body.time), 'HH:mm');
    }
    const updatedSchedule = await scheduleService.updateSchedule(req.body);
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
