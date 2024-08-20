import { Router } from 'express';
import { userController, } from '../objects/userObjects.js';

// class RouterIn{
//     get(){}
//     post(){}
//     put(){}
//     delete(){}
// }
const router = Router();

router.get('/', userController.getUsers);
router.get('/:username',userController.getUserByName);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;
