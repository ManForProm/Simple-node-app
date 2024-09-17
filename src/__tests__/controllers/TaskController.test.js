import 'reflect-metadata';
import TaskController from '../../controllers/TaskController.js';
import TaskService from '../../services/TaskService.js';

jest.mock('../../services/TaskService.js');
jest.mock('../../utils/ValidationProvider.js');

describe('TaskController', () => {
  let taskController;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    const mockTaskService = new TaskService();
    const mockValidationProvider = jest.fn();
    taskController = new TaskController(mockTaskService, mockValidationProvider);

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

  test('should create task', async () => {
    const newTask = { id: 1, title: 'New Task' };
    mockReq.body = {
      title: 'New Task',
      discription: 'Task description',
      complete: false,
      userEmail: 'test@example.com'
    };
    taskController._taskService.createTask.mockResolvedValue(newTask);

    await taskController.createTask(mockReq, mockRes);

    expect(taskController._taskService.createTask).toHaveBeenCalledWith(
      'New Task',
      'Task description',
      false,
      'test@example.com'
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(newTask);
  });
});