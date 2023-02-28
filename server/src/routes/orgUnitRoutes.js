import * as orgUnitController from '../controllers/orgUnitController';
import { Router } from 'express';
import upload from '../lib/multer';
import { authenticated } from '../middlewares/auth';

const router = Router();

router.get('/', authenticated, orgUnitController.getAllOrgUnits);

router.get('/:id', authenticated, orgUnitController.getOrgUnitById);

router.post('/', authenticated, orgUnitController.createOrgUnit);

router.put('/:id', authenticated, orgUnitController.updateOrgUnit);

router.delete('/:id', authenticated, orgUnitController.deleteOrgUnit);

router.post(
  '/import',
  authenticated,
  upload.single('file'),
  orgUnitController.importOrgUnits
);

export default router;
