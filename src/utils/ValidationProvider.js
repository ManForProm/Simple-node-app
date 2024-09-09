import { body, param, validationResult } from 'express-validator';
import inversify from "inversify";
import { APP_TYPES } from '../di/appTypes.js';

export class ValidationProvider {
    constructor(userService, taskService){
        this._userService = userService;
        this._taskService = taskService;
    }
    getByUserNameValidationChain(validationProvider){return [ param('username')
        .notEmpty()
        .withMessage("User id is required")
        .custom(validationProvider.isEmailNotExist),]}

    postUserValidationChain (validationProvider){return [
        body('username').exists({ checkFalsy: true })
                        .withMessage("User name is required")
                        .isString()
                        .withMessage("User name should be string")
                        .custom(validationProvider.isUsernameExist),
        body("password").exists()
                        .withMessage("Password is required")
                        .isString()
                        .withMessage("Password should be string")
                        .isLength({ min: 5 })
                        .withMessage("Password should be at least 5 characters"),
        body("email").optional()
                    .isEmail()
                    .withMessage("Provide valid email")
                    .custom(validationProvider.isEmailExist),
    ]}

    putUserValidationChain(validationProvider){
        return [
            param('id').notEmpty().withMessage("User id is required"),
            body('username').optional(),
            body("password").optional(),
            body("email").optional()
                        .isEmail()
                        .withMessage("Provide valid email")
                        .custom(validationProvider.isEmailExist),
        ]
    }

    deleteUserValidationChain(){
        return [ param('id')
            .notEmpty()
            .withMessage("User id is required"),]
    }
    getByEmailTaskValidationChain(validationProvider){
    return [ param('userEmail')
                            .isEmail()
                            .custom(validationProvider.isEmailTaskNotExist),]
    }

    postTaskValidationChain(validationProvider){return [
        body('title').exists({ checkFalsy: true })
            .withMessage("Title is required")
            .isString()
            .withMessage("Title should be string"),
        body("discription").isString()
            .withMessage("Discription should be string"),
        body("complete").exists({ checkFalsy: true })
            .isBoolean()
            .withMessage("Complete state should be boolean"),
        body("userEmail").exists({ checkFalsy: true })
            .isEmail()
            .withMessage("Provide valid email")
            .custom(validationProvider.isEmailExist),
    ]}
    putTaskValidationChain(){return [
        param('id').notEmpty().withMessage("Task id is required"),
        body('title').isString()
            .withMessage("Title should be string"),
        body("discription").isString()
            .withMessage("Discription should be string"),
        body("complete").isBoolean()
            .withMessage("Complete state should be boolean"),
        body("userEmail").exists({ checkFalsy: false }).withMessage("User Email isn't requred")]}
        
    deleteTaskValidationChain(){return [ param('id')
        .notEmpty()
        .withMessage("Task id is required"),]}
    

    isEmailNotExist = async (value) => {
        const user = await this._userService.getUserByName(value)
        console.log(`validation value: ${user}`);
        if(!user.toString()){
            throw new Error("User not found");
        }
    }
    isEmailTaskNotExist = async (value) => {
        console.log(`validation value: ${value}`);
        const task = await this._taskService.getTaskByEmail(value);
        if(!task.toString()){
            throw new Error("Tasks for this email is not exist");
        }
    }
    isEmailExist = async (value) => {
        const user = await this._userService.getUserByEmail(value);
        if(user.toString()){
            throw new Error("This email is exist");
        }
    }
    isUsernameExist = async (value) => {
        const user = await this._userService.getUserByName(value);
        if(user.toString()){
            throw new Error("This username is exist");
        }
    }
}

export const validationWrapper = (fn,req,res) => {
    const errors = validationResult(req);
    console.log(errors);
    if(errors.isEmpty()){
        return fn();
    }
    res.status(400).json({success: false,
         errors: errors.array() });
}


inversify.decorate(inversify.injectable(),ValidationProvider);
inversify.decorate(inversify.inject(APP_TYPES.UserService),ValidationProvider,0);
inversify.decorate(inversify.inject(APP_TYPES.TaskService),ValidationProvider,1);
