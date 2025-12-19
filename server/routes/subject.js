import express from "express";
import { body, validationResult } from "express-validator";
import Subject from "../models/Subject.js";
import Flashcard from "../models/Flashcard.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

/**
 * POST /api/subjects
 * Create a new subject
 */
router.post(
    "/create",
    authMiddleware,
    [
        body("title").notEmpty().withMessage("Subject title is required"),

        body("description").optional().isString().withMessage("Description must be a string")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description } = req.body;

            const subject = await Subject.create({
                title,
                description,
                user: req.session.userId
            });

            res.status(201).json({
                message: "Subject created successfully",
                subject
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * GET /api/subjects
 * Get all subjects for logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const subjects = await Subject.find({
            user: req.session.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({ subjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * DELETE /api/subject/delete/:subjectId
 * Delete a subject and all its flashcards
 */
router.delete("/delete/:subjectId", authMiddleware, async (req, res) => {
    try {
        const { subjectId } = req.params;

        // Check if subject exists and belongs to user
        const subject = await Subject.findOne({
            _id: subjectId,
            user: req.session.userId
        });

        if (!subject) {
            return res.status(404).json({
                message: "Subject not found or not authorized"
            });
        }

        // Delete all flashcards under this subject (cascade delete)
        await Flashcard.deleteMany({
            subject: subjectId,
            user: req.session.userId
        });

        // Delete the subject
        await Subject.deleteOne({ _id: subjectId });

        res.status(200).json({
            message: "Subject and related flashcards deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

/**
 * PUT /api/subject/update/:subjectId
 * Update subject details (title / description)
 */
router.put(
    "/update/:subjectId",
    authMiddleware,
    [
        body("title").optional().notEmpty().withMessage("Title cannot be empty"),

        body("description").optional().isString().withMessage("Description must be a string")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { subjectId } = req.params;
            const { title, description } = req.body;

            // Check if subject exists and belongs to user
            const subject = await Subject.findOne({
                _id: subjectId,
                user: req.session.userId
            });

            if (!subject) {
                return res.status(404).json({
                    message: "Subject not found or not authorized"
                });
            }

            // Update only provided fields
            if (title !== undefined) subject.title = title;
            if (description !== undefined) subject.description = description;

            await subject.save();

            res.status(200).json({
                message: "Subject updated successfully",
                subject
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Server error"
            });
        }
    }
);

export default router;
