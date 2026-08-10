const cloudinary = require("../utils/cloudinary");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");

const getProducts = asyncHandler(async (req, res) => {
    const { search, category, minPrice, maxPrice, inStock, sort, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };
    }
    // Category Filter
    if (category) {
        filter.category = category;
    }
    // Price Filter
    if (minPrice || maxPrice) {

        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }

    }
    // Stock Filter
    if (inStock === "true") {
        filter.stock = {
            $gt: 0
        };
    }

    if (inStock === "false") {
        filter.stock = 0;
    }
    // Sorting
    let sortOption = {};

    if (sort === "price_asc") {
        sortOption.price = 1;
    }

    if (sort === "price_desc") {
        sortOption.price = -1;
    }

    if (sort === "newest") {
        sortOption.createdAt = -1;
    }
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    res.status(200).json({
        success: true,
        page: Number(page),
        limit: Number(limit),
        totalProducts,
        totalPages: Math.ceil(totalProducts / Number(limit)),
        count: products.length,
        data: products
    });
});

const createProduct = asyncHandler(async (req, res) => {

    let imageUrl = "";

    if (req.file) {

        const result = await cloudinary.uploader.upload(req.file.path);

        imageUrl = result.secure_url;

        fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        packaging: req.body.packaging,
        application: req.body.application,
        features: req.body.features,
        price: req.body.price,
        stock: req.body.stock, 
        image: imageUrl
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
    });

});
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         message: "Product created successfully",
//         data: product
//     });

// });
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.packaging = req.body.packaging || product.packaging;
    product.application = req.body.application || product.application;
    product.features = req.body.features || product.features;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    if (req.file) {

        const result = await cloudinary.uploader.upload(req.file.path);

        if (product.image) {
            // Old image delete later (next lecture)
        }

        product.image = result.secure_url;

        fs.unlinkSync(req.file.path);
    }

    await product.save();

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
    });

});
 const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });

});


const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        data: product
    });

});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};