import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function Navbar() {
    const { user, setUser, setToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="bg-blue-700 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2x1 font-bold">OmSai-TextFlow</h1>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="block md:hidden text-2xl"
                >
                    ☰
                </button>

                <ul
                    className={`${menuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row gap-6 items-center absolute md:static top-16 right-4 bg-blue-700 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none`}
                >
                    <NavLink to="/" className={({ isActive }) => isActive
                        ? "text-yellow-300"
                        : "hover:text-yellow-300 transition"}>Home
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive
                        ? "text-yellow-300"
                        : "hover:text-yellow-300 transition"}>product
                    </NavLink>
                    {user && user.role !== "admin" && (
                        <NavLink
                            to="/my-orders"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300"
                                    : "hover:text-yellow-300 transition"
                            }
                        >
                            My Orders
                        </NavLink>
                    )}
                    {user?.role === "admin" && (
                        <>
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300"
                                        : "hover:text-yellow-300 transition"
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin/orders"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-yellow-300"
                                        : "hover:text-yellow-300 transition"
                                }
                            >
                                Admin Orders
                            </NavLink>
                        </>
                    )}
                    {user ? (
                        <>
                            <li className="text-yellow-300">
                                Welcome {user.name}
                            </li>

                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("accessToken");
                                        localStorage.removeItem("refreshToken");
                                        localStorage.removeItem("user");

                                        setUser(null);
                                        setToken(null);
                                    }}
                                    className="hover:text-yellow-300 transition"
                                >
                                    Logout
                                </button>
                            </li>


                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300"
                                    : "hover:text-yellow-300 transition"
                            }
                        >
                            Login
                        </NavLink>
                    )}
                    <NavLink to="/Contact" className={({ isActive }) => isActive
                        ? "text-yellow-300"
                        : "hover:text-yellow-300 transition"}>Contact
                    </NavLink>

                </ul>
            </div>
        </nav>
    );
}
export default Navbar;