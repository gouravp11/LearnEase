import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },

        answer: {
            type: String,
            required: true,
            trim: true
        },

        Subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Flashcard", flashcardSchema);
