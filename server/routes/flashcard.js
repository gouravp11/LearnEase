import express from "express";
import { body, validationResult } from "express-validator";
import Flashcard from "../models/Flashcard.js";
import Subject from "../models/Subject.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

/**
 * POST /api/flashcards/create
 * Create a new flashcard under a subject
 */
router.post(
    "/create",
    authMiddleware,
    [
        body("question").notEmpty().withMessage("Question is required"),
        body("answer").notEmpty().withMessage("Answer is required"),
        body("subjectId").notEmpty().withMessage("Subject ID is required")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { question, answer, subjectId } = req.body;

            const subject = await Subject.findOne({
                _id: subjectId,
                user: req.session.userId
            });

            if (!subject) {
                return res.status(404).json({ message: "Subject not found or not authorized" });
            }

            const flashcard = await Flashcard.create({
                question,
                answer,
                subject: subject._id,
                user: req.session.userId
            });

            res.status(201).json({
                message: "Flashcard created successfully",
                flashcard
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * GET /api/flashcard/exists
 * Checks for the existence of at least one flashcard for the authenticated user.
 */
router.get("/exists", authMiddleware, async (req, res) => {
    try {
        const { subjectId } = req.query;

        const filter = {
            user: req.session.userId
        };

        if (subjectId) {
            filter.subject = subjectId;
        }

        const exists = await Flashcard.exists(filter);

        res.json({ exists: !!exists });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * GET /api/flashcards/:subjectId
 * Get all flashcards under a subject
 */
router.get("/:subjectId", authMiddleware, async (req, res) => {
    try {
        const { subjectId } = req.params;

        // Verify subject belongs to logged-in user
        const subject = await Subject.findOne({
            _id: subjectId,
            user: req.session.userId
        });

        if (!subject) {
            return res.status(404).json({
                message: "Subject not found or not authorized"
            });
        }

        const flashcards = await Flashcard.find({
            subject: subjectId,
            user: req.session.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            subject: {
                id: subject._id,
                title: subject.title
            },
            flashcards
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * GET /api/flashcards
 * Get all flashcards of logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const flashcards = await Flashcard.find({
            user: req.session.userId
        })
            .populate("subject", "title")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: flashcards.length,
            flashcards
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * PUT /api/flashcard/update/:flashcardId
 * Update flashcard question or answer only
 */
router.put(
    "/update/:flashcardId",
    authMiddleware,
    [
        body("question").optional().notEmpty().withMessage("Question cannot be empty"),
        body("answer").optional().notEmpty().withMessage("Answer cannot be empty")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { flashcardId } = req.params;
            const { question, answer } = req.body;

            // Fetch the flashcard and verify ownership
            const flashcard = await Flashcard.findOne({
                _id: flashcardId,
                user: req.session.userId
            });

            if (!flashcard) {
                return res.status(404).json({
                    message: "Flashcard not found or not authorized"
                });
            }

            // Update only question/answer
            if (question !== undefined) flashcard.question = question;
            if (answer !== undefined) flashcard.answer = answer;

            await flashcard.save();

            res.status(200).json({
                message: "Flashcard updated successfully",
                flashcard
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

/**
 * DELETE /api/flashcard/delete/:flashcardId
 * Delete a flashcard
 */
router.delete("/delete/:flashcardId", authMiddleware, async (req, res) => {
    try {
        const { flashcardId } = req.params;

        const flashcard = await Flashcard.findOne({
            _id: flashcardId,
            user: req.session.userId
        });

        if (!flashcard) {
            return res.status(404).json({
                message: "Flashcard not found or not authorized"
            });
        }

        await Flashcard.deleteOne({ _id: flashcardId });

        res.status(200).json({
            message: "Flashcard deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;

/**
 * GET /api/flashcard/review/random
 * Fetch a random flashcard of logged-in user
 */
router.get("/review/random", authMiddleware, async (req, res) => {
    try {
        const flashcards = await Flashcard.find({ user: req.session.userId });

        if (!flashcards || flashcards.length === 0) {
            return res.status(404).json({ message: "No flashcards found" });
        }

        // Pick a random flashcard
        const randomIndex = Math.floor(Math.random() * flashcards.length);
        const randomFlashcard = flashcards[randomIndex];

        res.status(200).json(randomFlashcard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * GET /api/flashcard/review/:subjectId
 * Fetch a random flashcard of logged-in user for a specific subject
 */
router.get("/review/:subjectId", authMiddleware, async (req, res) => {
    try {
        const { subjectId } = req.params;

        const flashcards = await Flashcard.find({
            user: req.session.userId,
            subject: subjectId
        });

        if (!flashcards || flashcards.length === 0) {
            return res.status(404).json({ message: "No flashcards found for this subject" });
        }

        const randomIndex = Math.floor(Math.random() * flashcards.length);
        const randomFlashcard = flashcards[randomIndex];

        res.status(200).json(randomFlashcard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
