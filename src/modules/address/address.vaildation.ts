import Joi from "joi";

export const addressSchemaCreate = Joi.object({
    city: Joi.string(),
    street: Joi.string(),
    phone: Joi.string()
});

export const addressSchemaDelete = Joi.object({
    address: Joi.string().hex().length(24).required(),
});

