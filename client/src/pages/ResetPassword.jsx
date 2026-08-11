import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                `/users/reset-password/${token}`,
                {
                    password,
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center text-blue-700">
                    Reset Password
                </h1>

                <p className="text-gray-600 text-center mt-3">
                    Enter your new password.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded-lg mt-6"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border p-3 rounded-lg mt-4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg mt-6 hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ResetPassword;