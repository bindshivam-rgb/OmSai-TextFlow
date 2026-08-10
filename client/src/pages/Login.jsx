import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

    async function handleLogin() {
    if (email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });

        // Save Tokens
localStorage.setItem("accessToken", response.data.accessToken);
localStorage.setItem("refreshToken", response.data.refreshToken);
localStorage.setItem("user", JSON.stringify(response.data.data));

// Update Context
setToken(response.data.accessToken);
setUser(response.data.data);

  alert("Login Successful");

   // Clear Form
      setEmail("");
      setPassword("");

  navigate("/");
        
  } catch (error) {
  console.log(error);

  if (error.response) {
    alert(error.response.data.message);
  } else {
    alert("Login Failed");
  }
}

}
    
    return(
    <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 w-96">
            <h1 className="text-3xl font-bold text-center text-blue-700">Login</h1>
            <input type="email" placeholder="Enter Email" value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full border p-3 rounded mt-6"/>
            <input type={showPassword ? "text": "password"} placeholder="Enter Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
             className="w-full border p-3 rounded mt-6"/>
             <button onClick={() => setShowPassword(! showPassword)} className="text-gray-700 mt-2">
                {showPassword ? "Hide Password" : "Show Password"}
             </button>
            <button onClick={handleLogin}  className="w-full bg-blue-700 text-white
             py-3 rounded-lg mt-6 hover:bg-blue-800 transition">Login</button>
            
        </div>
    </div>
    );
}
export default Login;