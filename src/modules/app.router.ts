import express from "express";
import categoryRouter from "./Category/category.router.js";
import userRouter from "./User/user.router.js";
import subCategoryRouter from "./SubCategory/subCategory.router.js";
import brandRouter from "./Brand/brand.router.js";
import productRouter from "./Product/product.router.js";
import authRouter from "./auth/auth.router.js";
import couponRouter from "./coupon/coupon.router.js";
import reviewRouter from "./Review/review.router.js";
import wishlistRouter from "./wishlist/wishlist.router.js";
import addressRouter from "./address/address.router.js";

const appRouter = express.Router();


// appRouter.use('/auth', authRouter)

appRouter.use('/user', userRouter)
appRouter.use("/category", categoryRouter);
appRouter.use("/subcategory", subCategoryRouter);
appRouter.use("/brand", brandRouter);
appRouter.use("/product", productRouter);
appRouter.use("/coupon", couponRouter);
appRouter.use("/review", reviewRouter);
appRouter.use('/wishlist', wishlistRouter)
appRouter.use('/address', addressRouter)

export default appRouter