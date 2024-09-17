import inversify, { Container } from "inversify";
import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";
import TaskRepository from "../repositories/TaskRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import TaskService from "../services/TaskService.js";
import UserService from "../services/UserService.js";
import { ValidationProvider } from "../utils/ValidationProvider.js";
import { APP_TYPES } from "./appTypes.js";

export const container = new Container();
container.bind(APP_TYPES.TaskRepository).to(TaskRepository);
container.bind(APP_TYPES.TaskController).to(TaskController);
container.bind(APP_TYPES.TaskService).to(TaskService);
container.bind(APP_TYPES.UserRepository).to(UserRepository);
container.bind(APP_TYPES.UserController).to(UserController);
container.bind(APP_TYPES.UserService).to(UserService);
container.bind(APP_TYPES.ValidationProvider).to(ValidationProvider).inSingletonScope();



inversify.decorate(inversify.injectable(),TaskController)
inversify.decorate(inversify.inject(APP_TYPES.TaskService),TaskController,0);
inversify.decorate(inversify.inject(APP_TYPES.ValidationProvider),TaskController,1);


inversify.decorate(inversify.injectable(),ValidationProvider);
inversify.decorate(inversify.inject(APP_TYPES.UserService),ValidationProvider,0);
inversify.decorate(inversify.inject(APP_TYPES.TaskService),ValidationProvider,1);

inversify.decorate(inversify.injectable(),TaskService);
inversify.decorate(inversify.inject(APP_TYPES.TaskRepository),TaskService,0);


