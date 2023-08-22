import Joi from "joi";

const couponSchema = Joi.object({
    code: Joi.string().min(2).max(50).required(),
    discount: Joi.number().required(),
    expires: Joi.date().required(),
});

export { couponSchema };
