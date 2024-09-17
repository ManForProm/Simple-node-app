import UserService from '../../services/UserService.js';

jest.mock('../../services/UserService.js');
jest.mock('../../utils/ValidationProvider.js');

describe('UserController', () => {
  let userController;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    const mockUserService = new UserService();
    const mockValidationProvider = jest.fn();
    userController = new TaskController(mockUserService, mockValidationProvider);

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
    const users = [{"id":2,"username":"manforprom","email":"manforprom@gmail.com","password":"1223213","createdAt":"2024-09-05T11:45:07.000Z","updatedAt":"2024-09-05T11:45:07.000Z"},
      {"id":3,"username":"adsda","email":"emailas21@gmail.com","password":"pas1sword","createdAt":"2024-09-09T06:20:17.000Z","updatedAt":"2024-09-09T06:21:10.000Z"},
      {"id":4,"username":"a","email":"ems21@gmail.com","password":"password","createdAt":"2024-09-09T06:20:44.000Z","updatedAt":"2024-09-09T06:27:44.000Z"}];
    userController._userService.getAllUsers.mockResolvedValue(users);

    await userController.getUsers(mockReq, mockRes);

    expect(userController._taskService.getAllTasks).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(users);
  });

  // test('should create task', async () => {
  //   const newTask = { id: 1, title: 'New Task' };
  //   mockReq.body = {
  //     title: 'New Task',
  //     discription: 'Task description',
  //     complete: false,
  //     userEmail: 'test@example.com'
  //   };
  //   taskController._taskService.createTask.mockResolvedValue(newTask);

  //   await taskController.createTask(mockReq, mockRes);

  //   expect(taskController._taskService.createTask).toHaveBeenCalledWith(
  //     'New Task',
  //     'Task description',
  //     false,
  //     'test@example.com'
  //   );
  //   expect(mockRes.status).toHaveBeenCalledWith(201);
  //   expect(mockRes.json).toHaveBeenCalledWith(newTask);
  // });
});