import { taskService, } from "../objects/taskObjects.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export default class TaskController{

    getTasks =  asyncWrapper( async (req, res) => {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        }
    );

    getTasksByEmail =  asyncWrapper(async (req, res) => {
            const userEmail = req.params.userEmail
            console.log("Received userEmail:", userEmail);
            const tasks = await taskService.getTaskByEmail(userEmail);
            res.json(tasks);
        }
    );

    createTask =  asyncWrapper( async (req, res) => {
            const {title, discription, complete, userEmail} = req.body;
            console.log('Received request to create task with data:', {
                title,
                discription,
                complete,
                userEmail
            });
            const newTask = await taskService.createTask(title, discription, complete, userEmail,);
            res.status(201).json(newTask)
        }
    );

    updateTask =  asyncWrapper( async (req,res) => {
            const {title, discription, complete, userEmail} = req.body;
            const task_id = parseInt(req.params.id);
            const updatedTask = await taskService.updateTask(task_id, title, discription, complete, userEmail);
            res.status(201).json(updatedTask);
        }
    )

    deleteTask =  asyncWrapper(  async (req, res) => {
            const id = parseInt(req.params.id);
            await taskService.deleteTask(id);
            console.log("Received Id:", id);
            res.json({status: "success"});
        }
    )
}


// let tasks = [
//     new Task(1, "do something", "i will do something"),
//     new Task(2, "do something", "i will do something"),
//     new Task(3, "do something", "i will do something"),
// ];

// export const getTasks = (req, res) => {
//     res.json(tasks);
// }

// export const getTaskById = (req,res) => {
//     const taskId = parseInt(req.params.id)
//     const task  = tasks.find(t => t.id === taskId );
//     task ? res.json(task) : res.status(404).json({message:"Task not found"});
// }

// export const createTask = (req, res) => {
//     const newTask = addTask(req.body.title, req.body.discription);
//     tasks.push(newTask);
//     res.status(201).json(newTask)
// }

// // export const completeTask = (req,res) => {
// //     const taskId = parseInt(req.params.id)
// //     const taskIndex  = tasks.findIndex(t => t.id === taskId );
// //     if(taskIndex != -1){
// //         tasks[taskIndex] = {...tasks[taskIndex], ...req.body.complete}; 
// //         res.json(tasks[taskIndex]);
// //     }else{
// //         res.status(404).json({message:"Task not found"})
// //     }
// // }

// export const updateTask = (req, res) => {
//     const taskId = parseInt(req.params.id)
//     const taskIndex  = tasks.findIndex(t => t.id === taskId );
//     if(taskIndex != -1){
//         tasks[taskIndex] = {...tasks[taskIndex], ...req.body}; 
//         res.json(tasks[taskIndex]);
//     }else{
//         res.status(404).json({message:"Task not found"})
//     }
// }

// export const deleteTask = (req, res) => {
//     const taskId = parseInt(req.params.id)
//     const taskIndex  = tasks.findIndex(t => t.id === taskId );
//     if(taskIndex != -1){
//         tasks.splice(taskIndex, 1);
//         tasks = tasks.map(t => t.id > taskId ? new Task(...t,...{id:t.id - 1}) : t)
//         res.status(204).end();
//     }else{
//         res.status(404).json({message:"Task not found"})
//     }
// }

// function addTask(title, discription){
//     let maxId = tasks.length > 0 ? Math.max(tasks.map(task => tasks.id)) : 0 ;
//     return new Task(maxId + 1 , title, discription)
// }