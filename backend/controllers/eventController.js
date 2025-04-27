import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import Register from "../models/registerModel.js";
import qr from "qrcode";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const createEvent = async (req, res) => {
    const {title, description, location, date, time} = req.body;
    const {userId} = req.params;
    try {
        const role = await User.findById(userId);
        if (!role || role.role !== 'admin') {
            return res.status(401).json({ message: "User must be an Admin" });
        }
        const newEvent = new Event({
            title,
            description,
            location,
            date,
            time
        });
        const result = await newEvent.save();
        if(!result) {
            return res.status(400).json({ message: "Event not created" });
        }
        return res.status(201).json({ message: "Event created successfully", id: result._id });
    } catch (err) {
        console.error("Error adding new Event: "+err);
    }
}

export { createEvent };

const allEvents = async (req,res) => {
    try {
        const events = await Event.find({}).populate("admin");
        if (events.length === 0) {
            return res.status(401).json({ message: "No events !" });
        }
        return res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching all events: "+err);
    }
}

export { allEvents };

const registerEvent = async (req,res)=>{
    try {
        const {userId, eventId} = req.params;
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if(!user || user.role !== 'student') {
            return res.status(401).json({ message: "User must be a Student" });
        }
        const userEmail = user.email;

        const qrdata = `Event : ${eventId}, User : ${userId}`;
        const qrCode = await qr.toDataURL(qrdata);
        // console.log(qrCode);
        const newRegister = new Register({
            event: eventId,
            user: userId,
            qrCode : qrCode
        });
        const result = await newRegister.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // authenticated email
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mail = {
            from : process.env.EMAIL, //must be authenticated email
            to : userEmail,
            subject : "Event Registration",
            html : `
                <h1>Registration Successfull</h1>
                <p>Below is your QR code for the event</p>
                <div>
                    <h2>${event.title}</h2>
                    <p>${event.description}</p>
                    <p>${event.location}</p>
                    <p>${event.date}</p>
                    <p>${event.time}</p>
                    <p>Scan the QR code below to check in at the event</p>
                </div>
                <img src="cid:qrcode" style="width: 200px; height: 200px;" />
            `,
            attachments: [
                {
                    filename: "qrcode.png",
                    content: qrCode.split(",")[1], // Remove the base64 prefix
                    encoding: "base64",
                    cid: "qrcode", // Content ID for embedding the image
                },
            ],
        }
        await transporter.sendMail(mail);

        return res.status(201).json({eventId, message: "Registered successfully", id: result._id });
        
    } catch (err) {
        console.error("Error registering for event: "+err);
    }
}

export { registerEvent };

const getRegisteredEvents = async (req,res) => {
    try {
        const {userId} = req.params;
        const registeredEvents = await Register.find({user: userId}).populate("event").populate("user");
        if (registeredEvents.length === 0) {
            return res.status(201).json({ message: "No events registered  or the user does not exist" });
        }
        return res.status(200).json(registeredEvents);
    } catch (err) {
        console.error("Error fetching registered events: "+err);
    }
}

export { getRegisteredEvents };

const getRegisteredUsers = async (req,res) => {
    try {
        const {eventId} = req.params;
        const registeredUsers = await Register.find({event: eventId}).populate("event").populate("user");
        if (registeredUsers.length === 0) {
            return res.status(201).json({ message: "No users registered for this event" });
        }
        return res.status(200).json(registeredUsers);
    } catch (err) {
        console.error("Error fetching registered users: "+err);
    }
}

export { getRegisteredUsers };  

const getCheckInStats = async (req,res) => {
    try {
        const {eventId} = req.params;
        
        //retreiving total users
        const totalUsers = await Register.countDocuments({event: eventId});

        //retreiving number of checked-In users
        const checkedIdUsers = await Register.countDocuments({event: eventId, checkedIn: true});

        return res.status(201).json({total_users: totalUsers, check_In_Users: checkedIdUsers});
    } catch (err) {
        console.error('error fetching check-In stats: '+err);
    }
}

export { getCheckInStats };

const exportAttendeeList = async (req,res)=>{
    try {
        const events = await Register.find({}).populate('user', 'name email').populate('event', 'title location date time');

        if(!events || events.length === 0) {
            return res.status(401).json({ message: "No registered events" });
        }

        return res.status(201).json(events);

    } catch (err) {
        console.error("Error fetching all registered events: "+ err)
    }
}

export {exportAttendeeList};