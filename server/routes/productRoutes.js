const upload = require("../middleware/upload");
const authorize = require("../middleware/authorizeMiddleware");
const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const validateProduct = require("../middleware/validationMiddleware");
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/add-product", protect, authorize("admin"),upload.single("image"),
     createProduct);
router.put(
    "/:id",
    protect,
    authorize("admin"),
    upload.single("image"),
    updateProduct);
router.delete("/:id", protect, authorize("admin"),
    deleteProduct);
module.exports = router;