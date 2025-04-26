import express from 'express';
const  mainRouter = express.Router();
import { userRouter } from './user.router.js';

mainRouter.use("/user",userRouter)

export {mainRouter};