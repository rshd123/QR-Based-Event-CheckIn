import Register from "../models/registerModel.js";


//eventId from decoded QR in frontend then send it to backend
const readQrCode = async (req, res) => {
    try {
        const { eventId } = req.body; // Assuming the QR code is sent in the request body
    
        // Find the registration using the QR code
        const registration = await Register.findOne({ eventId });
    
        if (!registration) {
            return res.status(404).json({ message: "event not found" });
        }


        registration.checkedIn = true;
        await registration.save(); // Save the updated registration status  
    
        // Return the registration details
        return res.status(200).json({ message:"Check-In successfull" });
    } catch (error) {
        console.error("Error reading QR code:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {readQrCode};
