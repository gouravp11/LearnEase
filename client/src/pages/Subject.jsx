import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FlashcardCard from "../components/FlashcardCard";
import {
    createFlashcard,
    getFlashcardsBySubject,
    updateFlashcard,
    deleteFlashcard,
    checkFlashcardExists
} from "../api/flashcard";
import { useFlashcards } from "../context/flashcardContext";

const Subject = () => {
    const { id: subjectId } = useParams();

    const { setHasFlashcards } = useFlashcards();

    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editingFlashcardId, setEditingFlashcardId] = useState(null);
    const [error, setError] = useState("");

    // After creating/deleting a flashcard
    const refreshFlashcardState = async () => {
        try {
            const res = await checkFlashcardExists(subjectId); // or global if dashboard
            setHasFlashcards(res.data.exists);
        } catch (err) {
            console.error(err);
        }
    };

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
                refreshFlashcardState();
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
            refreshFlashcardState();
            fetchFlashcards();
        } catch (err) {
            console.error(err);
            setError("Failed to delete flashcard");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#030712] p-4">
                <div className="max-w-6xl mx-auto ">
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    {/* Create / Edit Flashcard */}
                    <div className="bg-[#10141e] p-4 rounded-lg shadow-md mb-8 max-w-sm mx-auto border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">
                            {editingFlashcardId ? "Edit Flashcard" : "Create Flashcard"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                        />

                        <textarea
                            placeholder="Answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full mb-4 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                            rows={3}
                        />

                        <button
                            onClick={handleSave}
                            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            {editingFlashcardId ? "Update Flashcard" : "Create Flashcard"}
                        </button>
                    </div>

                    {/* Flashcards List */}
                    <h1 className="text-3xl font-bold mb-8 text-gray-200 underline">Flashcards</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {flashcards.length === 0 ? (
                            <p className="text-gray-400 text-base italic col-span-full">
                                No flashcards yet.
                            </p>
                        ) : (
                            flashcards.map((flashcard) => (
                                <FlashcardCard
                                    key={flashcard._id}
                                    flashcard={flashcard}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subject;
