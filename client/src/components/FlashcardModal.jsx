const FlashcardModal = ({ flashcard, onClose }) => {
    if (!flashcard) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4">Flashcard</h2>

                <div className="mb-4">
                    <p className="font-medium text-gray-800">Question</p>
                    <p className="mt-1 text-gray-700">{flashcard.question}</p>
                </div>

                <div>
                    <p className="font-medium text-gray-800">Answer</p>
                    <p className="mt-1 text-gray-700">{flashcard.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashcardModal;
