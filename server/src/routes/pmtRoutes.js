import { Router } from 'express';
import { authenticated } from '../middlewares/auth';
import {
  getPmtReport,
  latePmtReport,
} from '../controllers/pmtReportController';

const router = Router();

router.get('/', authenticated, getPmtReport);
router.get('/latePmt', authenticated, latePmtReport);

export default router;
