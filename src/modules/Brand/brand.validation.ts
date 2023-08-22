import Joi from "joi";

export const brandSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
});