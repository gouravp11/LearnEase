import { createContext, useContext, useState } from "react";
import { getSubjects, createSubject, updateSubject, deleteSubject } from "../api/subject";
import { checkFlashcardExists } from "../api/flashcard";
import { useFlashcards } from "./flashcardContext";

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
    const { setHasFlashcards } = useFlashcards();
    // After creating/deleting a subject check whether flashcards exist
    const refreshFlashcardState = async () => {
        try {
            const res = await checkFlashcardExists(); // or global if dashboard
            setHasFlashcards(res.data.exists);
        } catch (err) {
            console.error(err);
        }
    };

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const response = await getSubjects();
            setSubjects(response.data.subjects);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch subjects");
        } finally {
            setLoading(false);
        }
    };

    const addSubject = async (data) => {
        await createSubject(data);
        fetchSubjects();
    };

    const editSubject = async (id, data) => {
        await updateSubject(id, data);
        fetchSubjects();
    };

    const removeSubject = async (id) => {
        await deleteSubject(id);
        refreshFlashcardState();
        fetchSubjects();
    };

    return (
        <SubjectContext.Provider
            value={{
                subjects,
                loading,
                error,
                fetchSubjects,
                addSubject,
                editSubject,
                removeSubject
            }}
        >
            {children}
        </SubjectContext.Provider>
    );
};

export const useSubjects = () => useContext(SubjectContext);
