import { Router } from 'express';
import { container } from '../di/appModule.js';
import { APP_TYPES } from "../di/appTypes.js";

const router = Router();
const taskController = container.get(APP_TYPES.TaskController);

router.get('/', taskController.getTasks);
router.get('/:userEmail',taskController.getTasksByEmail);
router.post('/',taskController.createTask);
router.put('/:id',taskController.updateTask);
router.delete('/:id',taskController.deleteTask);

export default router;

