import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/signin");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="sticky top-0 bg-white shadow-md px-6 py-4 flex justify-between items-center">
            {/* Logo / App Name */}
            <h1 className="text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
                LearnEase
            </h1>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="text-gray-700 hover:text-blue-500 transition"
                >
                    Dashboard
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                    Signout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
