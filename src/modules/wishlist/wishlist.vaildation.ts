import Joi from "joi";

export const wishlistSchema = Joi.object({
    product: Joi.string().hex().length(24).required(),
});

