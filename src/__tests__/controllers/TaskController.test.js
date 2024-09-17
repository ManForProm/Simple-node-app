import { Container } from 'inversify';
import 'reflect-metadata';
import TaskController from '../../controllers/TaskController.js';
import TaskService from '../../services/TaskService.js';
import { ValidationProvider } from '../../utils/ValidationProvider.js';

let TaskServiceMock;
let container = null;
jest.mock('../../services/TaskService.js');
jest.mock('../../utils/ValidationProvider.js');

describe('TaskController with Inversify (JavaScript)', () => {
  let taskController;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    container = new Container();
    container.bind('TaskController').to(TaskController);
    container.bind('TaskService').to(TaskService);
    container.bind('ValidationProvider').to(ValidationProvider);
    taskController = container.get('TaskController');

    // Мокаем запрос и ответ
    mockReq = {
      params: {},
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should get all tasks', async () => {
    const tasks = [{ id: 1, title: 'Test Task' }];
    
    taskController._taskService.getAllTasks.mockResolvedValue(tasks);

    await taskController.getTasks(mockReq, mockRes);

    expect(taskController._taskService.getAllTasks).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(tasks);
  });

  test('should create a task', async () => {
    const newTask = { id: 1, title: 'New Task' };
    mockReq.body = { title: 'New Task', discription: 'Task description', complete: false, userEmail: 'test@example.com' };
    taskController._taskService.createTask.mockResolvedValue(newTask);
    
    await taskController.createTask(mockReq, mockRes);
    
    expect(taskController._taskService.createTask).toHaveBeenCalledWith(
      'New Task', 'Task description', false, 'test@example.com'
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);  // Проверяем статус 201
    expect(mockRes.json).toHaveBeenCalledWith(newTask);
  });
});