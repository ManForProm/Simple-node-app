import inversify from "inversify";
import User from "../models/user.js";

export default class UserRepository {
  async createUser(username, email, password) {
    const user = User.build({
      username: username,
      email: email,
      password: password,
    });
    return await user.save();
  }

  async getUserByEmail(email){
    return await User.findAll({ where: { email: email } });
  }

  async getUserByName(username) {
    return await User.findAll({ where: { username: username } });
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(username, email, password, userId) {
    console.log(`${userId} ${username} ${email} ${password} ${userId} `);
    const updatedUser = User.update(
      {
        // username: username,
        // email: email,
        password: password,
      },
      {
        where: { id: userId },
      }
    );
    return await updatedUser;
  }

  deleteUser = async (userId) => {
    console.log("Attempting to delete user with ID:", userId);
    await User.destroy({ where: { id: userId } });
  };
}

inversify.decorate(inversify.injectable(),UserRepository);
