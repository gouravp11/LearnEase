import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});
