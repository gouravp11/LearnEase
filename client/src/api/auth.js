import api from "./axiosInstance";

export const signup = (data) => api.post("/auth/signup", data);
export const signin = (data) => api.post("/auth/signin", data);
export const logout = () => api.post("/auth/logout");
export const checkAuth = () => api.get("/auth/me");
