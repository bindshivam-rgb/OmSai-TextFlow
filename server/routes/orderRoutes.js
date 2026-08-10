const express = require("express");
const router = express.Router();

const { createOrder,getMyOrders,getAllOrders, updateOrderStatus} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get(   "/",protect,authorize("admin"),getAllOrders);
router.put("/:id", protect, authorize("admin"), updateOrderStatus);
module.exports = router;