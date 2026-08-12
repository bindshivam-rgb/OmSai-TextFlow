const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
   
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      

      req.user = await User.findById(decoded.id).select("-password");

      

      return next();
    } catch (err) {
      

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