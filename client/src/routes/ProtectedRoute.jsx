import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../api/auth";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const checkAuthValidity = async () => {
        try {
            const response = await checkAuth();
            console.log(response);
            setIsAuth(response.data.authenticated);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthValidity();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return isAuth ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
