import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const userController =  container.get(APP_TYPES.UserController);

router.get('/', userController.getUsers);
router.get('/:username',userController.getByUserNameValidationChain(), userController.getUserByName);
router.post('/',userController.postUserValidationChain(),userController.createUser);
router.put('/:id',userController.putUserValidationChain(),userController.updateUser);
router.delete('/:id',userController.deleteUserValidationChain(),userController.deleteUser);

export default router;
