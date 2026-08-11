import { useState } from "react";
import axiosInstance from "../api/axios";
import { NavLink } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });

      console.log(response.data);
      alert("Registration Successful");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration Failed");
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded mt-6"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mt-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mt-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded mt-4"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-700 text-white py-3 rounded-lg mt-6 hover:bg-blue-800 transition"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;