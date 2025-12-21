import api from "./axiosInstance";

export const createFlashcard = (data) => api.post("/flashcard/create", data);
export const getFlashcards = () => api.get("/flashcard");
export const getFlashcardsBySubject = (subjectId) => api.get(`/flashcard/${subjectId}`);
export const updateFlashcard = (flashcardId, data) =>
    api.put(`/flashcard/update/${flashcardId}`, data);
export const deleteFlashcard = (flashcardId) => api.delete(`/flashcard/delete/${flashcardId}`);
export const getRandomFlashcard = () => api.get("/flashcard/review/random");
export const getRandomFlashcardBySubject = (subjectId) => api.get(`/flashcard/review/${subjectId}`);
export const checkFlashcardExists = (subjectId) => {
    if (subjectId) {
        return api.get(`/flashcard/exists?subjectId=${subjectId}`);
    }
    return api.get("/flashcard/exists");
};
