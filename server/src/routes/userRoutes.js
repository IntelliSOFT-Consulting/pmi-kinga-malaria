import * as userController from '../controllers/supervisorController';
import { Router } from 'express';
import { authenticated } from '../middlewares/auth';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/', authenticated, userController.getUsers);
router.get('/:id', authenticated, userController.getUserById);
router.post('/', authenticated, userController.createUser);
router.put('/:id', authenticated, userController.updateUser);
router.delete('/:id', authenticated, userController.deleteUser);
router.post('/import', authenticated, upload.single('file'), userController.importUsers);
router.post('/login', userController.userLogin);

export default router;
