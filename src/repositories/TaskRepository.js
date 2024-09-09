import inversify from "inversify";
import Task from "../models/task.js";
import User from "../models/user.js";

export default class TaskRepository {
  async createTask(title, discription, complite, userEmail) {
    //Find user by email
      const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error("User not found");
    }

    //Task_id query logic
    let lastTask 
    try{
      lastTask = await Task.findOne({
        order: [["task_id", "DESC"]],
      });
    }catch{
      console.log(lastTask)
    }
    const taskId = lastTask ? lastTask.task_id + 1 : 1;
    console.log(`${title} ${discription} ${complite} ${user.email} ${taskId  }`)
    const task = Task.build({
      task_id: taskId,
      title: title,
      discription: discription,
      complete: complite,
      userEmail: user.email,
    });
    return await task.save();
  }

  async getTaskByEmail(userEmail) {
    return await Task.findAll({ where: { userEmail: userEmail } });
  }

  async getAllTasks() {
    return await Task.findAll();
  }

  async updateTask(task_id, title, discription, complite) {
    console.log(`Repository data to update ${(task_id, title, discription, complite)} `);
    const updatedTask = Task.update(
      {
        task_id: task_id,
        title: title,
        discription: discription,
        complete: complite,
      },
      {
        where: { task_id: task_id },
      }
    );
    return await updatedTask;
  }

  deleteTask = async (id) => {
    await Task.destroy({ where: { task_id: id } });

    const tasks = await Task.findAll({
      order: [["id", "ASC"]],
    });

    for (let i = 0; i < tasks.length; i++) {
      await tasks[i].update({ task_id: i + 1 });
    }
  };
}

inversify.decorate(inversify.injectable(),TaskRepository);
