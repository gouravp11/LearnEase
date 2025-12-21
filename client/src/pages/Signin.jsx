import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";

const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const response = await signin({ email, password });
            console.log(response.data);

            // Redirect to dashboard
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Signin failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#030712]">
            <h1 className="absolute top-4 left-6 text-xl text-gray-200 font-semibold">LearnEase</h1>
            <div className="bg-[#10141e] p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-200">Sign in</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-white">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-white">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-white placeholder-gray-500"
                            placeholder="Your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                        Sign in
                    </button>
                </form>

                <p className="text-sm mt-4 text-center text-gray-300">
                    Don’t have an account?{" "}
                    <span
                        className="text-gray-400 cursor-pointer hover:text-gray-200"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signin;
