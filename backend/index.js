import express from "express";
const PORT = 3000;
const app = express();
import { mainRouter } from "./routes/main.router.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const {MONGO_URL} = process.env;


app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

async function connectDB(MONGO_URL) {
    await mongoose.connect(MONGO_URL);
}
connectDB(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.use("/", mainRouter);

