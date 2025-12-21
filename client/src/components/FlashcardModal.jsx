import { useEffect, useState } from "react";

const FlashcardModal = ({ flashcard, onClose, onFlashMore }) => {
    const [flipped, setFlipped] = useState(false);
    const [animating, setAnimating] = useState(false);

    if (!flashcard) return null;

    // Reset flip + animate when card changes
    useEffect(() => {
        setFlipped(false);
        setAnimating(true);

        const timer = setTimeout(() => {
            setAnimating(false);
        }, 250);

        return () => clearTimeout(timer);
    }, [flashcard._id]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-xl flex flex-col items-center">
                {/* Card */}
                <div
                    className={`flip-card w-full h-80 cursor-pointer transition-all duration-300
                        ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                    `}
                    onClick={() => setFlipped(!flipped)}
                >
                    <div
                        className="flip-card-inner w-full h-full relative transition-transform duration-500"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
                        }}
                    >
                        {/* Front */}
                        <div
                            className="absolute inset-0 bg-[#10141e] rounded-xl shadow-lg p-6
                                       flex flex-col justify-center items-center border border-gray-600"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <h2 className="text-sm mb-4 text-gray-300">Question</h2>
                            <p className="text-white font-semibold text-lg text-center">
                                {flashcard.question}
                            </p>
                            <p className="text-gray-400 text-sm mt-4">Click to reveal answer</p>
                        </div>

                        {/* Back */}
                        <div
                            className="absolute inset-0 bg-[#10141e] rounded-xl shadow-lg p-6
                                       flex flex-col justify-center items-center border border-gray-600"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                            }}
                        >
                            <h2 className="text-sm mb-4 text-gray-300">Answer</h2>
                            <p className="text-white font-semibold text-lg text-center">
                                {flashcard.answer}
                            </p>
                            <p className="text-gray-400 text-sm mt-4">Click to see question</p>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-gray-300 hover:text-white text-2xl"
                >
                    ✕
                </button>

                {/* Flash More */}
                {onFlashMore && (
                    <button
                        onClick={onFlashMore}
                        disabled={animating}
                        className="mt-6 bg-gray-700 text-white px-5 py-2 rounded-lg
                                   hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        Flash More
                    </button>
                )}
            </div>
        </div>
    );
};

export default FlashcardModal;
