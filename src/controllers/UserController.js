import inversify from "inversify";
import { APP_TYPES } from "../di/appTypes.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { validationWrapper } from "../utils/ValidationProvider.js";

export default class UserController {
  constructor(userService,){
    this._userService = userService
  }

  getUsers = asyncWrapper(async (req, res) => {
    const users = await this._userService.getAllUsers();
    res.json(users);
  });

  getUserByName = asyncWrapper(async (req, res) => {
    const username = req.params.username
    const response = async () => {
      const user = await this._userService.getUserByName(username);
      res.json(user);
    }
    console.log("Received userEmail:", username);
    validationWrapper(
      response,
      req,
      res
    )
  });

  createUser = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received request to create user with data:", {
      username,
      email,
      password,
    });
    const response = async () => {
      const newUser = await this._userService.createUser(username, email, password);
      res.status(201).json(newUser);
    }
    validationWrapper(
      response,
      req,
      res
    )
  });

  updateUser = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    const userId = parseInt(req.params.id);
    const updatedUser = await this._userService.updateUser(
      username,
      email,
      password,
      userId
    );
    res.status(201).json(updatedUser);
  });

  deleteUser = asyncWrapper(async (req, res) => {
    const email = req.params.email;
    await this._userService.deleteUser(email);
    console.log("Received Email:", email);
    res.json({ status: "success" });
  });
}


inversify.decorate(inversify.injectable(),UserController)
inversify.decorate(inversify.inject(APP_TYPES.UserService),UserController,0);
