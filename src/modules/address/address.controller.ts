import { NextFunction, Response } from "express";
import { AppError, catchAsyncError } from "../../utils/ErrorHandler.js";
import { userModel } from "../../model/user.model.js";
import { RequestAuth } from "../../utils/types.js";

export const addAddress = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {

    const user = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
    !user && next(new AppError(`User not found `, 404));

    user && res.json({ message: "success", user: user.addresses });
});


export const removeFromAddress = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    const { address } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: address } } }, { new: true });
    !user && next(new AppError(`User not found `, 404));

    user && res.json({ message: "success", user: user.addresses });
});


export const getAllUserAddress = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {


    const user = await userModel.findOne({ _id: req.user._id })
    !user && next(new AppError(`User not found `, 404));

    user && res.json({ message: "success", user: user.addresses });
});
