const SubjectCard = ({ subject, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{subject.title}</h3>

            {subject.description && <p className="text-gray-600 mb-4">{subject.description}</p>}

            <div className="flex justify-between">
                <button
                    onClick={() => onView(subject._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                    View
                </button>

                <button
                    onClick={() => onEdit(subject)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(subject._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SubjectCard;
