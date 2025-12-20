import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects, createSubject, deleteSubject, updateSubject } from "../api/subject";
import Navbar from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";

const Dashboard = () => {
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingSubjectId, setEditingSubjectId] = useState(null);
    const [error, setError] = useState("");

    // Fetch subjects
    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
            console.log(response);
            setSubjects(response.data.subjects);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch subjects");
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    // Create or update subject
    const handleSave = async () => {
        if (!title) {
            setError("Title is required");
            return;
        }

        try {
            if (editingSubjectId) {
                await updateSubject(editingSubjectId, { title, description });
            } else {
                await createSubject({ title, description });
            }

            setTitle("");
            setDescription("");
            setEditingSubjectId(null);
            setError("");

            fetchSubjects();
        } catch (err) {
            console.error(err);
            setError("Failed to save subject");
        }
    };

    // Edit subject
    const handleEdit = (subject) => {
        setTitle(subject.title);
        setDescription(subject.description || "");
        setEditingSubjectId(subject._id);
    };

    // Delete subject
    const handleDelete = async (subjectId) => {
        if (!window.confirm("Are you sure you want to delete this subject?")) return;

        try {
            await deleteSubject(subjectId);
            fetchSubjects();
        } catch (err) {
            console.error(err);
            setError("Failed to delete subject");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {/* Create / Edit Subject */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingSubjectId ? "Edit Subject" : "Create New Subject"}
                    </h2>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {editingSubjectId ? "Update Subject" : "Create Subject"}
                    </button>
                </div>

                {/* Subjects List */}
                <h1 className="text-3xl font-bold mb-6 text-center">Your Subjects</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject) => (
                        <SubjectCard
                            key={subject._id}
                            subject={subject}
                            onView={(id) => navigate(`/subject/${id}`)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
