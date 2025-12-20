import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/**
 * POST /api/auth/signup
 */
router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("Name is required"),

        body("email").isEmail().withMessage("Please enter a valid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists with this email"
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            // Response
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

/**
 * POST /api/auth/signin
 */
router.post(
    "/signin",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),

        body("password").notEmpty().withMessage("Password is required")
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Save user ID in session
            req.session.userId = user._id;

            // Successful login response
            res.status(200).json({
                message: "Signin successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
});

/**
 * GET /api/auth/me
 * Checks if user has a valid session
 */
router.get("/me", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ authenticated: false });
    }

    res.json({ authenticated: true });
});

export default router;
