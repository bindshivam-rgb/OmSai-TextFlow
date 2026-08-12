import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        packaging: "",
        application: "",
        features: "",
        price: "",
        stock: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("packaging", formData.packaging);
        data.append("application", formData.application);
        data.append("features", formData.features);
        data.append("price", formData.price);
        data.append("stock", formData.stock);

        if (image) {
            data.append("image", image);
        }

        try {
            const response = await axiosInstance.post(
                "/products/add-product",
                data
            );

            alert(response.data.message);

            setFormData({
                name: "",
                description: "",
                category: "",
                packaging: "",
                application: "",
                features: "",
                price: "",
                stock: "",
            });

            setImage(null);

            navigate("/products");

              } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
                Add Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block font-semibold text-gray-700">
                    Product Name
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Silicone"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <label className="block font-semibold text-gray-700">
                    Description
                </label>

                <textarea
                    name="description"
                    placeholder="Enter Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    rows="4"
                    required
                />
                <label className="block font-semibold text-gray-700">
                    Packaging
                </label>

                <input
                    type="text"
                    name="packaging"
                    placeholder="e.g. 20 Kg Drum"
                    value={formData.packaging}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <label className="block font-semibold text-gray-700">
                    Application
                </label>

                <input
                    type="text"
                    name="application"
                    placeholder="Application"
                    value={formData.application}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <label className="block font-semibold text-gray-700">
                    Features
                </label>

                <input
                    type="text"
                    name="features"
                    placeholder="Features"
                    value={formData.features}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />
                <label className="block font-semibold text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />
                <label className="block font-semibold text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />
                <label className="block font-semibold text-gray-700">
                    Stock
                </label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />
                <label className="block font-semibold text-gray-700">
                    Product Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;