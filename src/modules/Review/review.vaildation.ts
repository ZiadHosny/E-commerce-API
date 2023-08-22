import Joi from "joi";

const reviewSchemaCreate = Joi.object({
    comment: Joi.string().min(2).required(),
    product: Joi.string().hex().length(24).required(),
});

const reviewSchemaUpdate = Joi.object({
    comment: Joi.string().min(2).required(),
});

export { reviewSchemaCreate, reviewSchemaUpdate };
