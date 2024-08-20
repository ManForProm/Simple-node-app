import User from '../models/user.js';

export default class UserRepository{
    async createUser( username, email, password ) {

        const user = User.build({
            username: username,
            email: email,
            password: password,});
        return await user.save()
    };

    async getUserByName(username){
        return await User.findAll({where: {username: username}});
    };

    async getAllUsers(){
        return await User.findAll();
    };

    async updateUser(username, email, password,userId){
        console.log(` ${username} ${email} ${ password} ${ userId} `);
        const updatedUser = User.update({
            username: username,
            email: email,
            password: password,},
            {
                where: {id:userId}
            }
        );
        return await updatedUser
    };

    deleteTask = async(email) => {
        await User.destroy({where: {email:userEmail}})
    }
}