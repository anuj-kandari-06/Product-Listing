import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./User.js";

dotenv.config();

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const email = "shopuser06@gmail.com";
        const newPassword = "Anuj@066";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return;
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        console.log("Password updated successfully");
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

resetPassword();