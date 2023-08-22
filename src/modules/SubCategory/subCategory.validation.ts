import Joi from "joi";

export const subCategorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().hex().length(24).required()
});