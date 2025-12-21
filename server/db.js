import mongoose from "mongoose";
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/LearnEase";
const connectDB = () => {
    mongoose
        .connect(URI)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;
