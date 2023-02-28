import * as userController from '../controllers/userController';
import { Router } from 'express';
import { authenticated } from '../middlewares/auth';

const router = Router();

router.get('/', authenticated, userController.getUsers);
router.get('/:id', authenticated, userController.getUserById);
router.post('/', authenticated, userController.createUser);
router.put('/:id', authenticated, userController.updateUser);
router.delete('/:id', authenticated, userController.deleteUser);
router.post('/import', authenticated, userController.importUsers);
router.post('/login', userController.userLogin);

export default router;
