import { body, param } from 'express-validator';
import inversify from "inversify";
import { APP_TYPES } from "../di/appTypes.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { validationWrapper } from "../utils/ValidationProvider.js";

export default class UserController {
  constructor(userService, validationProvider){
    this._userService = userService;
    this._validationProvider = validationProvider;
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
    const id = req.params.id;
    await this._userService.deleteUser(id);
    console.log("Received Email:", id);
    res.json({ status: "success" });
  });

  getByUserNameValidationChain(){return [ param('username')
    .notEmpty()
    .withMessage("User id is required")
    .custom(this._validationProvider.isEmailNotExist),]}

  postUserValidationChain (){return [
      body('username').exists({ checkFalsy: true })
                      .withMessage("User name is required")
                      .isString()
                      .withMessage("User name should be string")
                      .custom(this._validationProvider.isUsernameExist),
      body("password").exists()
                      .withMessage("Password is required")
                      .isString()
                      .withMessage("Password should be string")
                      .isLength({ min: 5 })
                      .withMessage("Password should be at least 5 characters"),
      body("email").optional()
                  .isEmail()
                  .withMessage("Provide valid email")
                  .custom(this._validationProvider.isEmailExist),
  ]}

  putUserValidationChain(){
      return [
          param('id').notEmpty().withMessage("User id is required"),
          body('username').optional(),
          body("password").optional(),
          body("email").optional()
                      .isEmail()
                      .withMessage("Provide valid email")
                      .custom(this._validationProvider.isEmailExist),
      ]
  }

  deleteUserValidationChain(){
      return [ param('id')
          .notEmpty()
          .withMessage("User id is required"),]
  }
  
}


inversify.decorate(inversify.injectable(),UserController)
inversify.decorate(inversify.inject(APP_TYPES.UserService),UserController,0);
inversify.decorate(inversify.inject(APP_TYPES.ValidationProvider),UserController,1);
