import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import subjectRoutes from "./routes/subject.js";
import flashcardRoutes from "./routes/flashcard.js";
import cors from "cors";
dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 8080;
const app = express();

// CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

// Middleware to parse JSON
app.use(express.json());

// Session middleware (in-memory store)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "top_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true
        }
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/flashcard", flashcardRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});
