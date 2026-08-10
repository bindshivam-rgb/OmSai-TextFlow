const express = require("express");

const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/dashboardController");

const {
    protect
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/authorizeMiddleware");

router.get(
    "/stats",
    protect,
    authorize("admin"),
    getDashboardStats
);

module.exports = router;