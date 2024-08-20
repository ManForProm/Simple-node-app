import { userRepository } from "../objects/userObjects.js";

export default class UserService{
    async createUser(username , email, password,) {
        return await userRepository.createUser(username , email, password,);
    }
 
    async getAllUsers()  {
        return await userRepository.getAllUsers();
    }

    async getUserByName(username){
        return await userRepository.getUserByName(username);
    }

    
    async updateUser(username , email, password,userId,){
        return await userRepository.updateUser(username , email, password,userId,)
    }

    async deleteUser(email){
        return await userRepository.deleteUser(email)
    }
}