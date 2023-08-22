import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0),
    ratingAvg: Joi.number().min(1).max(5),
    ratingCount: Joi.number().min(0),
    description: Joi.string().min(5).max(300).required(),
    brand: Joi.string().hex().length(24).required(),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required()
});