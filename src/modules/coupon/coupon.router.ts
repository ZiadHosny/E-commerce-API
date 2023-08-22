import express from 'express'
import * as coupon from './coupon.controller.js'
import { validation } from '../../middleware/validation/validation.middleware.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';
import { couponSchema } from './coupon.vaildation.js';

const couponRouter = express.Router();

couponRouter
    .route('/')
    .get(coupon.getAllCoupons)
    .post(
        validation(couponSchema, 'body'),
        coupon.createCoupon
    )

couponRouter
    .route('/:id')
    .get(coupon.getCouponById)
    .put(
        validationId(),
        validation(couponSchema, 'body'),
        coupon.updateCoupon
    )
    .delete(coupon.deleteCoupon)

export default couponRouter;