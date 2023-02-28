import { Router } from 'express';
import { authenticated } from '../middlewares/auth';
import {
  updateSchedule,
  getSchedules,
  getMailList,
} from '../controllers/scheduleController';

const router = Router();

router.put('/', authenticated, updateSchedule);
router.get('/', authenticated, getSchedules);
router.get('/mail-list', authenticated, getMailList);

export default router;