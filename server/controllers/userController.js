const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
    generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const user = require("../models/user");
const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email
    });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    const createdUser = await User.findById(user._id).select("-password");
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: createdUser
    });
});
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid user name and password"
        });
    }
    const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
        success: true,
        message: "Login successfull",
        accessToken,
        refreshToken,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token is  required"
        });
    }
    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }


    const newAccessToken = generateAccessToken(user); (
        {
            id: user._id,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    );
    res.status(200).json({
        success: true,
        message: "New access token genrated",
        accessToken: newAccessToken,
    });
});
// logoutUser

const logoutUser = asyncHandler(async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Logout successful"
    });

});
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetUrl = `https://omsai-textflow-1.onrender.com/reset-password/${resetToken}`;
    const message = `Reset your password using the link below:${resetUrl}
This link will expire in 10 minutes.`;
    await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message: message
    });
    res.status(200).json({
        success: true,
        message: "Password reset email sent successfully"
    });
});
const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid reset token"
        });
    }

    if (user.resetPasswordExpire < Date.now()) {
        return res.status(400).json({
            success: false,
            message: "Reset token has expired"
        });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successful"
    });

});
const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});



module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    forgotPassword,
    resetPassword,
    getProfile
};