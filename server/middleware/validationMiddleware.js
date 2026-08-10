const productSchema = require ("../validations/productValidation");
const validateProduct = (req, res, next) => {
    const {error} = productSchema.validate(req.body, {
        abortEarly: false
    });
    if  (error) {
        return res.status(400).json ({
            message: error.details[0].message
        });
    }
    next();
};
module.exports=validateProduct;