const userSchema = require("../validations/userValidation");
const validateUser = (req,res, next) => {
    const { error } = userSchema.validate(req.body, {
        abortEarly: false 
    });
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors
        });
    }
    next();
}
module.exports = validateUser;