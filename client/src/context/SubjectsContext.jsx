import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { SUBJECTS } from "../data.js";

const SubjectsContext = createContext(null);

/** Shared subject list + the "create subject" modal state, so any screen can open it. */
export function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState(SUBJECTS);
    const [activeName, setActiveName] = useState(SUBJECTS[0]?.name ?? "All content");
    const [createOpen, setCreateOpen] = useState(false);

    // TODO: POST to your API, then add the subject it returns.
    const addSubject = useCallback(({ title, description }) => {
        setSubjects((s) => [
            ...s,
            { name: title, count: 0, title, desc: description || "No description yet." }
        ]);
        setActiveName(title);
    }, []);
    const updateSubject = useCallback((name, { title, description }) => {
        setSubjects((items) =>
            items.map((subject) =>
                subject.name === name
                    ? { ...subject, name: title, title, desc: description }
                    : subject
            )
        );
        setActiveName((current) => (current === name ? title : current));
    }, []);
    const removeSubject = useCallback((name) => {
        setSubjects((items) => items.filter((subject) => subject.name !== name));
        setActiveName((current) => (current === name ? "All content" : current));
    }, []);
    const openCreate = useCallback(() => setCreateOpen(true), []);

    const value = useMemo(
        () => ({
            subjects,
            activeName,
            setActiveName,
            addSubject,
            updateSubject,
            removeSubject,
            createOpen,
            setCreateOpen,
            openCreate
        }),
        [subjects, activeName, addSubject, updateSubject, removeSubject, createOpen, openCreate]
    );
    return <SubjectsContext.Provider value={value}>{children}</SubjectsContext.Provider>;
}

export function useSubjects() {
    const ctx = useContext(SubjectsContext);
    if (!ctx) throw new Error("useSubjects must be used inside <SubjectsProvider>");
    return ctx;
}
