import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const response = await axiosInstance.get("/orders");

            setOrders(response.data.data);
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Failed to load orders");
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(orderId, status) {
        try {
            const response = await axiosInstance.put(
                `/orders/${orderId}`,
                { status }
            );

            alert(response.data.message);

            fetchOrders();

        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Failed to update order");
            }
        }
    }

    if (loading) {
        return (
            <h1 className="text-center text-3xl mt-10">
                Loading Orders...
            </h1>
        );
    }

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
                Admin Orders
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">
                    No orders found.
                </p>
            ) : (
                <div className="max-w-6xl mx-auto space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white shadow-lg rounded-xl p-6"
                        >

                            <div className="flex flex-col md:flex-row gap-6">

                                <img
                                    src={order.product?.image}
                                    alt={order.product?.name}
                                    className="w-full md:w-48 h-40 object-cover rounded-lg"
                                />

                                <div className="flex-1">

                                    <h2 className="text-2xl font-bold">
                                        {order.product?.name}
                                    </h2>

                                    <p className="mt-2">
                                        <strong>Customer:</strong>{" "}
                                        {order.user?.name}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {order.user?.email}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        ₹{order.product?.price}
                                    </p>

                                    <p>
                                        <strong>Quantity:</strong>{" "}
                                        {order.quantity}
                                    </p>

                                    <p>
                                        <strong>Order ID:</strong>{" "}
                                        {order._id}
                                    </p>

                                    <p className="mt-2">
                                        <strong>Status:</strong>{" "}
                                        {order.status}
                                    </p>

                                    <p className="text-gray-500 mt-2">
                                        <strong>Ordered:</strong>{" "}
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "Confirmed"
                                        )
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "Shipped"
                                        )
                                    }
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Ship
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "Delivered"
                                        )
                                    }
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Delivered
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            order._id,
                                            "Cancelled"
                                        )
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default AdminOrders;