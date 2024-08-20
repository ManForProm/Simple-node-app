import { taskRepository } from "../objects/taskObjects.js";
export default class TaskService{
    async createTask(title, discription, complite, userEmail) {
        return await taskRepository.createTask(title, discription, complite, userEmail);
    }

    async getAllTasks()  {
        return await taskRepository.getAllTasks();
    }

    async getTaskByEmail(userEmail){
        return await taskRepository.getTaskByEmail(userEmail);
    }

    
    async updateTask(id,title, discription, complite){
        return await taskRepository.updateTask(id,title, discription, complite)
    }

    async deleteTask(id){
        return await taskRepository.deleteTask(id)
    }
}