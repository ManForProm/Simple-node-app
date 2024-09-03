import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const userController =  container.get(APP_TYPES.UserController);
const validationProvider =  container.get(APP_TYPES.ValidationProvider);

router.get('/', userController.getUsers);
router.get('/:username',validationProvider.getByUserNameValidationChain, userController.getUserByName);
router.post('/',validationProvider.postUserValidationChain,userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;
