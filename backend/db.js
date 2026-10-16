import mongoose from "mongoose";
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully !");
    } catch (error) {
        console.error("MongoDB connection faild:", error.message);
        process.exit(1);
    }
}
export default connectDB;