const multer = require("multer");
const errorHandler = (err, req, res, next) => {
 // Multer File Size Error
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File size should not exceed 5 MB."
            });
        }

    }

    // Custom File Type Error
    if (err.message === "Only JPG, JPEG and PNG images are allowed") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }


    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};
module.exports = errorHandler;