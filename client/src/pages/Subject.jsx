import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FlashcardCard from "../components/FlashcardCard";
import {
    createFlashcard,
    getFlashcardsBySubject,
    updateFlashcard,
    deleteFlashcard
} from "../api/flashcard";

const Subject = () => {
    const { id: subjectId } = useParams();

    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editingFlashcardId, setEditingFlashcardId] = useState(null);
    const [error, setError] = useState("");

    // Fetch flashcards for this subject
    const fetchFlashcards = async () => {
        try {
            const response = await getFlashcardsBySubject(subjectId);
            setFlashcards(response.data.flashcards);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch flashcards");
        }
    };

    useEffect(() => {
        fetchFlashcards();
    }, [subjectId]);

    // Create or update flashcard
    const handleSave = async () => {
        if (!question || !answer) {
            setError("Question and answer are required");
            return;
        }

        try {
            if (editingFlashcardId) {
                await updateFlashcard(editingFlashcardId, { question, answer });
            } else {
                await createFlashcard({
                    question,
                    answer,
                    subjectId
                });
            }

            setQuestion("");
            setAnswer("");
            setEditingFlashcardId(null);
            setError("");

            fetchFlashcards();
        } catch (err) {
            console.error(err);
            setError("Failed to save flashcard");
        }
    };

    // Edit flashcard
    const handleEdit = (flashcard) => {
        setQuestion(flashcard.question);
        setAnswer(flashcard.answer);
        setEditingFlashcardId(flashcard._id);
    };

    // Delete flashcard
    const handleDelete = async (flashcardId) => {
        if (!window.confirm("Delete this flashcard?")) return;

        try {
            await deleteFlashcard(flashcardId);
            fetchFlashcards();
        } catch (err) {
            console.error(err);
            setError("Failed to delete flashcard");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {/* Create / Edit Flashcard */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingFlashcardId ? "Edit Flashcard" : "Create Flashcard"}
                    </h2>

                    <input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        placeholder="Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />

                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {editingFlashcardId ? "Update Flashcard" : "Create Flashcard"}
                    </button>
                </div>

                {/* Flashcards List */}
                <h1 className="text-3xl font-bold mb-6 text-center">Flashcards</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flashcards.map((flashcard) => (
                        <FlashcardCard
                            key={flashcard._id}
                            flashcard={flashcard}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Subject;
