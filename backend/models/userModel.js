import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema ({
    role :{
        type:String,
        required: true,
        enum :["admin", "student"],
    }, 
    name : {
        type:String,
        required:true,
    },
    username : {
        type :String,
        required : true,
        unique:true,
    },
    email : {
        type :String,
        required : true,
    },
    password : {
        type :String,
        required : true,
    },

});

const User = mongoose.model("User", userSchema);
export default User;

