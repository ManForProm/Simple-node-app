import { Router } from 'express';
import { taskController } from '../objects/taskObjects.js';

const router = Router();

router.get('/', taskController.getTasks);
router.get('/:userEmail',taskController.getTasksByEmail);
router.post('/',taskController.createTask);
router.put('/:id',taskController.updateTask);
router.delete('/:id',taskController.deleteTask);

export default router;

