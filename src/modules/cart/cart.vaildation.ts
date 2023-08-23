import Joi from "joi";

export const cartSchemaCreate = Joi.object({
    product: Joi.string().hex().length(24).required(),
});


export const cartSchemaUpdate = Joi.object({
    quantity: Joi.number().min(0),
});

export const cartApplyCoupon = Joi.object({
    code: Joi.string()
});


