import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const Signup = async (req, res) => {
    const { role, name, username, email, password } = req.body;
    try {
        const user = await User.findOne({ role, username })
        if (user) {
            return res.status(401).json({ role, message: "Username Already Exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            role,
            name,
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const result = await User.findOne({ username });
        const { JWT_SECRET_KEY } = process.env;

        const token = jwt.sign({ id: result._id }, JWT_SECRET_KEY, { expiresIn: "7d" });
        return res.status(201).json({ message: "User added successfully", id: result._id, token });
    } catch (err) {
        console.error(err);
    }
}

export {Signup};


const Login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if(req.body.email.length === 0 || req.body.password.length === 0){
            return res.status(401).json({message:"Incomplete Credentials !"});
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Username does not exist!" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password ' });
        }
        const { JWT_SECRET_KEY } = process.env;
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: "7d" });
        return res.status(201).json({ message: "User logged successfully", id: user._id, token });
    } catch (err) {
        console.error(err);
    }
}

export {Login};

const allUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(201).json({ message: "No users !" });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching all users: "+err);
    }
};

export {allUsers};


