// context/FlashcardContext.jsx
import { createContext, useContext, useState } from "react";

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
    const [hasFlashcards, setHasFlashcards] = useState(false);

    return (
        <FlashcardContext.Provider value={{ hasFlashcards, setHasFlashcards }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcards = () => useContext(FlashcardContext);
