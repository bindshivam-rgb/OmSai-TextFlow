import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            const response = await axiosInstance.get("/dashboard/stats");

            setStats(response.data.data);
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Failed to load dashboard");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <h1 className="text-center text-3xl mt-10">
                Loading Dashboard...
            </h1>
        );
    }

    if (!stats) {
        return (
            <h1 className="text-center text-3xl mt-10">
                Dashboard data not available
            </h1>
        );
    }

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
                Admin Dashboard
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-blue-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Total Users
                    </h2>
                    <p className="text-4xl font-bold text-blue-700 mt-3">
                        {stats.totalUsers}
                    </p>
                </div>

                <div className="bg-blue-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Total Products
                    </h2>
                    <p className="text-4xl font-bold text-blue-700 mt-3">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="bg-blue-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Total Orders
                    </h2>
                    <p className="text-4xl font-bold text-blue-700 mt-3">
                        {stats.totalOrders}
                    </p>
                </div>

                <div className="bg-yellow-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Pending Orders
                    </h2>
                    <p className="text-4xl font-bold text-yellow-700 mt-3">
                        {stats.pendingOrders}
                    </p>
                </div>

                <div className="bg-indigo-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Confirmed Orders
                    </h2>
                    <p className="text-4xl font-bold text-indigo-700 mt-3">
                        {stats.confirmedOrders}
                    </p>
                </div>

                <div className="bg-orange-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Shipped Orders
                    </h2>
                    <p className="text-4xl font-bold text-orange-700 mt-3">
                        {stats.shippedOrders}
                    </p>
                </div>

                <div className="bg-green-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Delivered Orders
                    </h2>
                    <p className="text-4xl font-bold text-green-700 mt-3">
                        {stats.deliveredOrders}
                    </p>
                </div>

                <div className="bg-red-100 p-8 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold">
                        Cancelled Orders
                    </h2>
                    <p className="text-4xl font-bold text-red-700 mt-3">
                        {stats.cancelledOrders}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;