import UserController from '../controllers/UserController.js';
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";

export const userRepository = new UserRepository;
export const userService = new UserService; 
export const userController = new UserController;
