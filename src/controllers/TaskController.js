import inversify from "inversify";
import { APP_TYPES } from "../di/appTypes.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export default class TaskController {
    constructor(taskService){
        this._taskSercice = taskService;
    }
  getTasks = asyncWrapper(async (req, res) => {
    const tasks = await this._taskService.getAllTasks();
    res.json(tasks);
  });

  getTasksByEmail = asyncWrapper(async (req, res) => {
    const userEmail = req.params.userEmail;
    console.log("Received userEmail:", userEmail);
    const tasks = await this._taskService.getTaskByEmail(userEmail);
    res.json(tasks);
  });

  createTask = asyncWrapper(async (req, res) => {
    const { title, discription, complete, userEmail } = req.body;
    console.log("Received request to create task with data:", {
      title,
      discription,
      complete,
      userEmail,
    });
    const newTask = await this._taskService.createTask(
      title,
      discription,
      complete,
      userEmail
    );
    res.status(201).json(newTask);
  });

  updateTask = asyncWrapper(async (req, res) => {
    const { title, discription, complete, userEmail } = req.body;
    const task_id = parseInt(req.params.id);
    const updatedTask = await this_taskService.updateTask(
      task_id,
      title,
      discription,
      complete,
      userEmail
    );
    res.status(201).json(updatedTask);
  });

  deleteTask = asyncWrapper(async (req, res) => {
    const id = parseInt(req.params.id);
    await this._taskService.deleteTask(id);
    console.log("Received Id:", id);
    res.json({ status: "success" });
  });
}

inversify.decorate(inversify.injectable(),TaskController)
inversify.decorate(inversify.inject(APP_TYPES.TaskService),TaskController,0);