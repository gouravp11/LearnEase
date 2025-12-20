const FlashcardCard = ({ flashcard, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold mb-2">Q: {flashcard.question}</p>
            <p className="text-gray-700 mb-4">A: {flashcard.answer}</p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={() => onEdit(flashcard)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(flashcard._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FlashcardCard;
