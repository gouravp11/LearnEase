import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import { useSubjects } from "../context/SubjectContext";

const Dashboard = () => {
    const navigate = useNavigate();

    const { subjects, fetchSubjects, addSubject, editSubject, removeSubject, error } =
        useSubjects();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingSubjectId, setEditingSubjectId] = useState(null);
    const [localError, setLocalError] = useState("");

    // Create or update subject
    const handleSave = async () => {
        if (!title) {
            setLocalError("Title is required");
            return;
        }

        try {
            if (editingSubjectId) {
                await editSubject(editingSubjectId, { title, description });
            } else {
                await addSubject({ title, description });
            }

            setTitle("");
            setDescription("");
            setEditingSubjectId(null);
            setLocalError("");
        } catch (err) {
            console.error(err);
            setLocalError("Failed to save subject");
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
            await removeSubject(subjectId);
        } catch (err) {
            console.error(err);
            setLocalError("Failed to delete subject");
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#030712] p-4">
                <div className="max-w-6xl mx-auto">
                    {(error || localError) && (
                        <div className="text-red-500 mb-4 text-center">{error || localError}</div>
                    )}

                    {/* Create / Edit Subject */}
                    <div className="bg-[#10141e] p-4 rounded-lg shadow-md mb-8 max-w-sm mx-auto border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">
                            {editingSubjectId ? "Edit Subject" : "Create New Subject"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                        />

                        <input
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mb-4 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                        />

                        <button
                            onClick={handleSave}
                            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            {editingSubjectId ? "Update Subject" : "Create Subject"}
                        </button>
                    </div>

                    {/* Subjects List */}
                    <h1 className="text-3xl font-bold mb-8 text-gray-200 underline">
                        Your Subjects
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.length === 0 ? (
                            <p className="text-gray-400 text-base italic col-span-full">
                                No subjects yet
                            </p>
                        ) : (
                            subjects.map((subject) => (
                                <SubjectCard
                                    key={subject._id}
                                    subject={subject}
                                    onView={(id) => navigate(`/subject/${id}`)}
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

export default Dashboard;
