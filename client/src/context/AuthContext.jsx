import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  useEffect(() => {
    async function loadUser() {
      if (!token) return;

      try {
        const response = await axiosInstance.get("/users/profile");

        setUser(response.data.data);
      } catch (error) {
        console.log(error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
        setToken(null);
      }
    }

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;