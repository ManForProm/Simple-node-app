import inversify from "inversify";
import { APP_TYPES } from "../di/appTypes.js";

export default class TaskService {
    constructor(taskRepository){
        this._taskRepository = taskRepository;
    }
  async createTask(title, discription, complite, userEmail) {
    return await this._taskRepository.createTask(
      title,
      discription,
      complite,
      userEmail
    );
  }

  async getAllTasks() {
    return await this._taskRepository.getAllTasks();
  }

  async getTaskByEmail(userEmail) {
    return await this._taskRepository.getTaskByEmail(userEmail);
  }

  async updateTask(id, title, discription, complite) {
    return await this._taskRepository.updateTask(id, title, discription, complite);
  }

  async deleteTask(id) {
    return await this._taskRepository.deleteTask(id);
  }
}


inversify.decorate(inversify.injectable(),TaskService);
inversify.decorate(inversify.inject(APP_TYPES.TaskRepository),TaskService,0);