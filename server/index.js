import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("server is running at PORT", PORT);
});
