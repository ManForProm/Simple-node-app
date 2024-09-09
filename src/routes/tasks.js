import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const taskController = container.get(APP_TYPES.TaskController);
const validationProvider =  container.get(APP_TYPES.ValidationProvider);

router.get('/', taskController.getTasks);
router.get('/:userEmail',validationProvider.getByEmailTaskValidationChain(validationProvider),taskController.getTasksByEmail);
router.post('/',validationProvider.postTaskValidationChain(validationProvider),taskController.createTask);
router.put('/:id',validationProvider.putTaskValidationChain(validationProvider),taskController.updateTask);
router.delete('/:id',validationProvider.deleteTaskValidationChain(),taskController.deleteTask);

export default router;

