import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { getRandomFlashcard, getRandomFlashcardBySubject } from "../api/flashcard";
import FlashcardModal from "./FlashcardModal";
import { useFlashcards } from "../context/flashcardContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { hasFlashcards } = useFlashcards();

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

            if (isSubjectPage) {
                response = await getRandomFlashcardBySubject(subjectId);
            } else {
                response = await getRandomFlashcard();
            }
            console.log(response);
            setFlashcard(response.data);
        } catch (error) {
            console.error("Failed to fetch random flashcard", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="sticky top-0 bg-[#030712] shadow-md px-6 py-4 flex justify-between items-center">
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
                <FlashcardModal flashcard={flashcard} onClose={() => setFlashcard(null)} />
            )}
        </>
    );
};

export default Navbar;
