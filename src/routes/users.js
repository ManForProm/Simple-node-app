import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const userController =  container.get(APP_TYPES.UserController);
const validationProvider =  container.get(APP_TYPES.ValidationProvider);

router.get('/', userController.getUsers);
router.get('/:username',validationProvider.getByUserNameValidationChain(validationProvider), userController.getUserByName);
router.post('/',validationProvider.postUserValidationChain(validationProvider),userController.createUser);
router.put('/:id',validationProvider.putUserValidationChain(validationProvider),userController.updateUser);
router.delete('/:id',validationProvider.deleteUserValidationChain(validationProvider),userController.deleteUser);

export default router;
