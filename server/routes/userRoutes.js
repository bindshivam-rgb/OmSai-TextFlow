const express = require("express")
const { registerUser, loginUser,
    refreshAccessToken, logoutUser, forgotPassword, resetPassword, getProfile} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protect, getProfile);
module.exports = router;