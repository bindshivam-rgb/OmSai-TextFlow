import { useState } from "react";
import axiosInstance from "../api/axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                "/users/forgot-password",
                { email }
            );

            alert(response.data.message);

            setEmail("");

        } catch (error) {

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
                    Forgot Password
                </h1>

                <p className="text-gray-600 text-center mt-3">
                    Enter your registered email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded-lg mt-6"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg mt-6 hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ForgotPassword;