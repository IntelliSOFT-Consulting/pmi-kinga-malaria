import { Router } from 'express';
import { login } from '../services/authService';

import {
  getFormSchema,
  getFormXlsx,
  convertFormXlsxToJson,
  getFormSubmissions,
} from '../services/formsService';
import { config } from 'dotenv';
import * as formController from '../controllers/formController';
import * as pmtReportController from '../controllers/pmtReportController';
import orgUnitRoutes from './orgUnitRoutes';
import userRoutes from './userRoutes';
import pmtRoutes from './pmtRoutes';
import reportRoutes from './reportRoutes';
import scheduleRoutes from './scheduleRoutes';

config();

const router = Router();

router.get('/forms', async (req, res) => {
  try {
    const token = await login({
      email: process.env.CENTRAL_EMAIL,
      password: process.env.CENTRAL_PASSWORD,
    });
    const formId = 'mro_in';
    const schema = await getFormSchema(false, token, formId);
    const xlsx = await getFormXlsx(false, token, formId);
    const json = await convertFormXlsxToJson(xlsx, schema);
    const submissions = await getFormSubmissions(false, token, formId, {
      from: '2022-01-01',
      to: '2022-12-31',
    });
    res.send(submissions);
  } catch (error) {
    res.send(error);
  }
});

router.get('/form-json', formController.getFormJson);

router.get(
  '/submissions-by-form',

  formController.submissionByForm
);

router.get('/pmt-report', pmtReportController.getPmtReport);

router.use('/org-units', orgUnitRoutes);
router.use('/users', userRoutes);
router.use('/pmt', pmtRoutes);
router.use('/reports', reportRoutes);
router.use('/schedules', scheduleRoutes);

export default router;
