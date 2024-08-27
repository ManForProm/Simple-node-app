import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const userController =  container.get(APP_TYPES.UserController);

router.get('/', userController.getUsers);
router.get('/:username',userController.getUserByName);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;
