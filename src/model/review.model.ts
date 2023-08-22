import { Schema, model, Types } from "mongoose";

const reviewSchema: Schema = new Schema(
    {
        comment: {
            type: String,
            trim: true,
            required: true,
        },
        product: {
            type: Types.ObjectId,
            ref: "product",
        },
        user: {
            type: Types.ObjectId,
            ref: "user",
        },

    },
    { timestamps: true }
)

reviewSchema.pre(['find', 'findOne'], function (next) {
    this.populate('user', 'name')
    next()
})

export const reviewModel = model('review', reviewSchema)