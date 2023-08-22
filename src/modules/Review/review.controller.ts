import { NextFunction, Response } from "express";
import { reviewModel } from "../../model/review.model.js";
import { AppError, catchAsyncError } from "../../utils/ErrorHandler.js";
import { getOneById, deleteOneById, getAll } from "../handlers/factor.handlers.js";
import { RequestAuth } from "../../utils/types.js";

export const getAllreviews = getAll(reviewModel)
export const getReviewById = getOneById(reviewModel, "Review")
export const deleteReview = deleteOneById(reviewModel, "Review")

const createOne = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    req.body.user = req.user._id

    const isReview = await reviewModel.findOne({
        user: req.user._id,
        product: req.body.product
    })

    if (isReview) return next(new AppError("you created a review before", 409));

    const result = new reviewModel({ ...req.body })

    await result.save()

    res.status(200).send({ message: "success", data: result })
})

const UpdateOneById = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let result = await reviewModel.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });

    !result && next(new AppError(`Review not found you are not authorized to perform this action`, 404));

    result && res.json({ message: "success", result });
})

export const createReview = createOne
export const updateReview = UpdateOneById