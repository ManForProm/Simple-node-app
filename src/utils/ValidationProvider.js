import { validationResult } from 'express-validator';

export class ValidationProvider {
    constructor(userService, taskService){
        this._userService = userService;
        this._taskService = taskService;
    }

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
