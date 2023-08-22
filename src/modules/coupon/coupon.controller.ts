import { couponModel } from "../../model/coupon.model.js";
import { getOneById, deleteOneById, getAll, UpdateOneById, createOne } from "../handlers/factor.handlers.js";

export const getAllCoupons = getAll(couponModel)
export const createCoupon = createOne({ model: couponModel })
export const updateCoupon = UpdateOneById({ model: couponModel, route: "Coupon", })
export const getCouponById = getOneById(couponModel, "Coupon")
export const deleteCoupon = deleteOneById(couponModel, "Coupon")

