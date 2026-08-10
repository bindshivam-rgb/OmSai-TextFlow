const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// Create Order
const createOrder = asyncHandler(async (req, res) => {

    const { product, quantity } = req.body;

    const order = await Order.create({
        user: req.user._id,
        product,
        quantity,
    });

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order,
    });

});
// Get Logged-in User Orders
const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id,
    })
    .populate("product", "name image price")
    .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        totalOrders: orders.length,
        data: orders,
    });

});

// Get All Orders (Admin)
const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find()
        .populate("user", "name email")
        .populate("product", "name image price")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        totalOrders: orders.length,
        data: orders,
    });

});
const updateOrderStatus = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
    });

});

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};