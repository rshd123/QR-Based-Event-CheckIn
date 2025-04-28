import express from 'express';
const  mainRouter = express.Router();
import { userRouter } from './user.router.js';
import { eventRouter } from './event.router.js';
import {qrRouter} from './qr.router.js';

mainRouter.get("/", (req, res) => {
    return res.status(200).json({ message: "Home Page" });
});

//All user routes
mainRouter.use("/user",userRouter)

//All event routes
mainRouter.use("/event",eventRouter)

//all qr routes
mainRouter.use("/qr",qrRouter)

//Error handling for wrong routes
mainRouter.get("/:error", (req, res) => {
    return res.status(404).json({ message: "Page Not Found" });
});

export {mainRouter};