import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FlashcardCard = ({ flashcard, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="bg-[#10141e] p-4 rounded-lg shadow-md border border-gray-600 relative">
            <p className="font-semibold mb-2 text-white">Q: {flashcard.question}</p>
            <p className="text-gray-300 mb-4">A: {flashcard.answer}</p>

            <div className="absolute top-2 right-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen);
                    }}
                    className="text-gray-400 hover:text-gray-200 p-1 rounded"
                >
                    <BsThreeDotsVertical />
                </button>

                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-32 bg-[#10141e] border border-gray-600 rounded shadow-lg z-10"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(flashcard);
                                setMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-white"
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(flashcard._id);
                                setMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-white"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlashcardCard;
