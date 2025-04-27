import mongoose from "mongoose";
import { Schema } from "mongoose";
import Event from "./eventModel.js";
import User from "./userModel.js";

// date, eventId, userId

const registerSchema = new Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref:"Event",
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    qrCode: {
        type: String, // Store the QR code as a string (e.g., base64 or URL)
        required: true,
    },
    checkedIn: {
        type: Boolean,
        default: false,
    }
});

const Register = mongoose.model("Register", registerSchema);
export default Register;