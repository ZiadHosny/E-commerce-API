import { NextFunction, Response } from "express";
import { AppError, catchAsyncError } from "../../utils/ErrorHandler.js";
import { userModel } from "../../model/user.model.js";
import { RequestAuth } from "../../utils/types.js";

export const addToWishlist = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {

    const { product } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: product } }, { new: true });
    !user && next(new AppError(`Review not found `, 404));

    user && res.json({ message: "success", user: user.wishlist });
});


export const removeFromWishlist = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    const { product } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishlist: product } }, { new: true });
    !user && next(new AppError(`Review not found `, 404));

    user && res.json({ message: "success", user: user.wishlist });
});


export const getAllUserWishlist = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {


    const user = await userModel.findOne({ _id: req.user._id }).populate('wishlist')
    !user && next(new AppError(`Review not found `, 404));

    user && res.json({ message: "success", user: user.wishlist });
});
