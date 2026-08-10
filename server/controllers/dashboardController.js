const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
        status: "Pending"
    });

    const confirmedOrders = await Order.countDocuments({
        status: "Confirmed"
    });

    const shippedOrders = await Order.countDocuments({
        status: "Shipped"
    });

    const deliveredOrders = await Order.countDocuments({
        status: "Delivered"
    });

    const cancelledOrders = await Order.countDocuments({
        status: "Cancelled"
    });

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalProducts,
            totalOrders,
            pendingOrders,
            confirmedOrders,
            shippedOrders,
            deliveredOrders,
            cancelledOrders
        }
    });
});

module.exports = {
    getDashboardStats
};