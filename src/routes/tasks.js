import { Router } from 'express';
import { param } from 'express-validator';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const taskController = container.get(APP_TYPES.TaskController);
const validationProvider =  container.get(APP_TYPES.ValidationProvider);

router.get('/', taskController.getTasks);
router.get('/:userEmail',param('userEmail')
                            .isEmail()
                            .custom(validationProvider.isEmailTaskNotExist),taskController.getTasksByEmail);
router.post('/',taskController.createTask);
router.put('/:id',taskController.updateTask);
router.delete('/:id',taskController.deleteTask);

export default router;

