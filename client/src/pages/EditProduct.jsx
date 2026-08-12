import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

function EditProduct() {
    const { id } = useParams();
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

    useEffect(() => {
        fetchProduct();
    }, []);

    async function fetchProduct() {
        try {
            const response = await axiosInstance.get(`/products/${id}`);

            setFormData(response.data.data);
        } catch (error) {
            alert("Failed to load product");
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (image) {
            data.append("image", image);
        }

        try {
            const response = await axiosInstance.put(
                `/products/${id}`,
                data
            );

            alert(response.data.message);

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

            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Edit Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

                <label className="block font-semibold text-gray-700">
                    Product Name
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Packaging
                </label>
                <input
                    type="text"
                    name="packaging"
                    placeholder="Enter packaging"
                    value={formData.packaging}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    application
                </label>
                <input
                    type="text"
                    name="application"
                    placeholder="Enter application"
                    value={formData.application}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Features
                </label>
                <input
                    type="text"
                    name="features"
                    placeholder="Enter features"
                    value={formData.features}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    name="category"
                    placeholder="Enter category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Stock
                </label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Enter stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />
                <label className="block font-semibold text-gray-700">
                    Product Image
                </label>
                <input
                    type="file"
                    placeholder="upload image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border p-3 rounded-lg"
                />

                <button className="w-full bg-blue-700 text-white py-3 rounded-lg">
                    Update Product
                </button>

            </form>

        </div>
    );
}

export default EditProduct;