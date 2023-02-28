import { Router } from 'express';
import {  authenticated } from '../middlewares/auth';

import * as reportsController from '../controllers/reportsController';


const router = Router();

router.get('/supervisory', authenticated, reportsController.getSupervisoryReport);
router.get('/submissions', authenticated, reportsController.getSubmissionsByForm);

export default router;
