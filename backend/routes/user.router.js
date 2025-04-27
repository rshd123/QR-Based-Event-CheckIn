import express from 'express';
const userRouter = express.Router();
import { Signup } from '../controllers/userController.js';
import { Login } from '../controllers/userController.js';
import { allUsers } from '../controllers/userController.js';

userRouter.get('/all',allUsers)
userRouter.post('/signup',Signup);
userRouter.post('/login',Login);


export { userRouter };