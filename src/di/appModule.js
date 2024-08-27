import { Container } from "inversify";
import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";
import TaskRepository from "../repositories/TaskRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import TaskService from "../services/TaskService.js";
import UserService from "../services/UserService.js";
import { APP_TYPES } from "./appTypes.js";

export const container = new Container();
container.bind(APP_TYPES.TaskRepository).to(TaskRepository);
container.bind(APP_TYPES.TaskController).to(TaskController);
container.bind(APP_TYPES.TaskService).to(TaskService);
container.bind(APP_TYPES.UserRepository).to(UserRepository);
container.bind(APP_TYPES.UserController).to(UserController);
container.bind(APP_TYPES.UserService).to(UserService);


