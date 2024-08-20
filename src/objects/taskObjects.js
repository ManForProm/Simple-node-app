import TaskController from '../controllers/TaskController.js';
import TaskRepository from "../repositories/TaskRepository.js";
import TaskService from "../services/TaskService.js";

export const taskRepository = new TaskRepository;
export const taskService = new TaskService; 
export const taskController = new TaskController;


