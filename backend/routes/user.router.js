import express from 'express';
const userRouter = express.Router();
import { Signup } from '../controllers/userAuth.js';
import { Login } from '../controllers/userAuth.js';

userRouter.post('/signup',Signup);

userRouter.post('/login',Login);


export { userRouter };