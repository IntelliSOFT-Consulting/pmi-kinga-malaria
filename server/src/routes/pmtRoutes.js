import { Router } from 'express';
import { authenticated } from '../middlewares/auth';
import {
  createReport,
  getPmtReport,
  latePmtReport,
} from '../controllers/pmtReportController';

const router = Router();

router.get('/', authenticated, getPmtReport);
router.get('/latePmt', authenticated, latePmtReport);
router.post('/save', createReport);

export default router;
