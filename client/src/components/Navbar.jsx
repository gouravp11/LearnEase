import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { getRandomFlashcard, getRandomFlashcardBySubject } from "../api/flashcard";
import FlashcardModal from "./FlashcardModal";
import { useFlashcards } from "../context/flashcardContext";
import { checkFlashcardExists } from "../api/flashcard";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { hasFlashcards, setHasFlashcards } = useFlashcards();

    const refreshFlashcardState = async () => {
        try {
            const res = await checkFlashcardExists(); // or global if dashboard
            setHasFlashcards(res.data.exists);
        } catch (err) {
            console.error(err);
        }
    };

    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(false);

    const isSubjectPage = location.pathname.startsWith("/subject/");
    const subjectId = isSubjectPage ? location.pathname.split("/")[2] : null;

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/signin");
        } catch (error) {
            console.error(error);
        }
    };

    const handleFlashRandom = async () => {
        try {
            setLoading(true);

            let response;
            let newCard;

            for (let i = 0; i < 2; i++) {
                // max 2 attempts
                if (isSubjectPage) {
                    response = await getRandomFlashcardBySubject(subjectId);
                } else {
                    response = await getRandomFlashcard();
                }

                newCard = response.data;

                if (!flashcard || newCard._id !== flashcard._id) {
                    break;
                }
            }

            setFlashcard(newCard);
        } catch (error) {
            console.error("Failed to fetch random flashcard", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshFlashcardState();
    }, []);
    return (
        <>
            <nav className="sticky top-0 bg-[#030712] shadow-2xl shadow-slate-900 px-6 py-4 flex justify-between items-center">
                {/* Logo / App Name */}
                <h1
                    className="text-xl font-semibold cursor-pointer text-gray-200"
                    onClick={() => navigate("/")}
                >
                    LearnEase
                </h1>

                {/* Center Controls */}
                <div className="flex items-center gap-3">
                    {hasFlashcards && (
                        <button
                            onClick={handleFlashRandom}
                            disabled={loading}
                            className="bg-gray-700 text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Flash a Random Card"}
                        </button>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-300 hover:text-gray-100 transition"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-gray-700 text-white px-4 py-1 rounded-lg hover:bg-gray-800 transition"
                    >
                        Signout
                    </button>
                </div>
            </nav>
            {/* Flashcard Modal */}
            {flashcard && (
                <FlashcardModal
                    flashcard={flashcard}
                    onClose={() => setFlashcard(null)}
                    onFlashMore={handleFlashRandom}
                />
            )}
        </>
    );
};

export default Navbar;
