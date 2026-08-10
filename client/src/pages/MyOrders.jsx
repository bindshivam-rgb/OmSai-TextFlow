import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  async function fetchMyOrders() {
    try {
      const response = await axiosInstance.get("/orders/my-orders");

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
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          You have no orders yet.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6"
            >

              <img
                src={
                  order.product?.image ||
                  "/images/no-image.png"
                }
                alt={order.product?.name}
                className="w-full md:w-48 h-40 object-cover rounded-lg"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {order.product?.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  Price: ₹{order.product?.price}
                </p>

                <p className="text-gray-600 mt-1">
                  Quantity: {order.quantity}
                </p>

                <p className="text-gray-600 mt-1">
                  Order ID: {order._id}
                </p>

                <div className="mt-4">
                  <span className="font-semibold">
                    Status:
                  </span>

                  <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyOrders;