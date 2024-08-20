import { userService, } from "../objects/userObjects.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export default class TaskController{

    getUsers =  asyncWrapper( async (req, res) => {
            const users = await userService.getAllUsers();
            res.json(users);
        }
    );

    getUserByName =  asyncWrapper(async (req, res) => {
            const username = req.params.username
            console.log("Received userEmail:", username);
            const user = await userService.getUserByName(username);
            res.json(user);
        }
    );

    createUser =  asyncWrapper( async (req, res) => {
            const {username , email, password,} = req.body;
            console.log('Received request to create user with data:', {
                username,
                email,
                password,
            });
            const newUser = await userService.createUser(username , email, password,);
            res.status(201).json(newUser)
        }
    );

    updateUser =  asyncWrapper( async (req,res) => {
            const {username , email, password,} = req.body;
            const userId = parseInt(req.params.id);
            const updatedUser = await userService.updateUser(username , email, password, userId);
            res.status(201).json(updatedUser);
        }
    )

    deleteUser =  asyncWrapper(  async (req, res) => {
            const email = req.params.email;
            await userService.deleteUser(email);
            console.log("Received Email:", email );
            res.json({status: "success"});
        }
    )
}