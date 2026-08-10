const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  console.log("========== AUTH ==========");
  console.log("Headers:", req.headers);
  console.log("Authorization:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    console.log("Token:", token);

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User:", req.user);

      return next();
    } catch (err) {
      console.log("JWT Error:", err.message);

      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: "No token provided",
  });
});

module.exports = { protect };