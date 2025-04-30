import mongoose from "mongoose";
import { Schema } from "mongoose";

const eventSchema = new Schema({

    admin:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        required:true,
        type:String,
        unique:true
    },
    description:{
        required:true,
        type:String
    },
    location:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date,
        validate:{
            validator: function(value) {
                return value > new Date();
            },
            message: "Event date must take place in future."
        }
    },
    time:{
        required:true,
        type:String
    }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;