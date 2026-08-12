import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import FeatureCard from "../components/FeatureCard";
import useAuth from "../hooks/useAuth";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data);
    } catch (error) {

      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const handleQuote = (productTitle) => {
    const message = `Hello OM SAI TEX CHEM,
I want a quotation for ${productTitle}.
Please share the price and details.`;

    const whatsappURL = `https://wa.me/918591134265?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-10">
        Loading Products...
      </h1>
    );
  }

  const handleOrder = async () => {

    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!selectedProduct) return;

    try {
      const response = await axiosInstance.post("/orders", {
        product: selectedProduct._id,
        quantity: quantity,
      });

      alert(response.data.message);

      setQuantity(1);
      navigate("/my-orders");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to place order");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/products/${id}`);

      alert(response.data.message);

      fetchProducts();

      setSelectedProduct(null);
    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Our Products
      </h1>
      {user?.role === "admin" && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            + Add Product
          </button>
        </div>
      )}

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-80"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {products
          .filter((item) =>
            (item.name || "").toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <FeatureCard
              key={item._id}
              title={item.name}
              description={item.description}
              image={item.image || "/images/no-image.png"}
              packaging={`${item.stock} Available`}
              application={item.category}
              features={`₹${item.price}`}
              onView={() => setSelectedProduct(item)}
            />
          ))}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white p-8 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedProduct.image || "/images/no-image.png"}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />

            <p className="text-blue-700 font-semibold text-sm">
              OM SAI TEXT CHEM
            </p>

            <h2 className="text-2xl font-bold mt-4">
              {selectedProduct.name}
            </h2>

            <p className="mt-3">
              {selectedProduct.description}
            </p>

            <div className="mt-5 bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>

              <p className="mt-2">
                <strong>Category:</strong> {selectedProduct.category}
              </p>

              <p className="mt-2">
                <strong>Price:</strong> ₹{selectedProduct.price}
              </p>
            </div>

            <div className="mt-6">
              <label className="block font-semibold mb-2">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={selectedProduct.stock}
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value >= 1 && value <= selectedProduct.stock) {
                    setQuantity(value);
                  }
                }}
                className="w-full border p-3 rounded-lg"
              />


            </div>
            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={handleOrder}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
              >
                Place Order
              </button>

              <button
                onClick={() => handleQuote(selectedProduct.name)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Request Quote
              </button>

            </div>


            {isAdmin && (
              <>
                <button
                  onClick={() =>
                    navigate(`/edit-product/${selectedProduct._id}`)
                  }
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition ml-3"
                >
                  Edit Product
                </button>

                <button
                  onClick={() =>
                    handleDelete(selectedProduct._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  Delete Product
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>

      )}
    </div>
  );
}

export default Products;