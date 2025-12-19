import api from "./axiosInstance";

export const createSubject = (data) => api.post("/subject/create", data);
export const getSubjects = () => api.get("/subject");
export const deleteSubject = (subjectId) => api.delete(`/subject/delete/${subjectId}`);
export const updateSubject = (subjectId, data) => api.put(`/subject/update/${subjectId}`, data);
