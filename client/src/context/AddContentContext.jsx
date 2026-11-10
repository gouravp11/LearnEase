import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AddContentContext = createContext(null);

export function AddContentProvider({ children }) {
    const [isOpen, setOpen] = useState(false);
    const open = useCallback(() => setOpen(true), []);
    const value = useMemo(() => ({ isOpen, setOpen, open }), [isOpen, open]);
    return <AddContentContext.Provider value={value}>{children}</AddContentContext.Provider>;
}

export function useAddContent() {
    const ctx = useContext(AddContentContext);
    if (!ctx) throw new Error("useAddContent must be used inside <AddContentProvider>");
    return ctx;
}
