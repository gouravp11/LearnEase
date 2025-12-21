import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import {
    getRandomFlashcard,
    getRandomFlashcardBySubject,
    checkFlashcardExists
} from "../api/flashcard";
import FlashcardModal from "./FlashcardModal";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const [selectedSubject, setSelectedSubject] = useState("all");
    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasFlashcards, setHasFlashcards] = useState(false);

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

    // Check if flashcards exist (global or per subject)
    const checkExists = async () => {
        try {
            const res = isSubjectPage
                ? await checkFlashcardExists(subjectId)
                : await checkFlashcardExists();

            setHasFlashcards(res.data.exists);
        } catch (err) {
            console.error("Failed to check flashcard existence", err);
            setHasFlashcards(false);
        }
    };

    useEffect(() => {
        checkExists();
    }, [isSubjectPage, subjectId]);

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
            <nav className="sticky top-0 bg-white shadow-md px-6 py-4 flex justify-between items-center">
                {/* Logo / App Name */}
                <h1 className="text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
                    LearnEase
                </h1>

                {/* Center Controls */}
                <div className="flex items-center gap-3">
                    {hasFlashcards && (
                        <button
                            onClick={handleFlashRandom}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Flash a Random Card"}
                        </button>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-700 hover:text-blue-500 transition"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
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
