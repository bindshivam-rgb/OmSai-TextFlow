const Joi = require("joi");
const productSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0),
    description: Joi.string().required()
});
module.exports = productSchema;