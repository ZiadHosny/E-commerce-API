import { Schema, model } from "mongoose";
import qrcode from 'qrcode';

const couponSchema = new Schema(
    {
        code: {
            type: String,
            trim: true,
            required: [true, 'coupon code required'],
            unique: true
        },
        discount: {
            type: Number,
            min: 0,
            required: [true, 'coupon discount required'],
        },
        expires: {
            type: Date,
            required: [true, 'coupon date required']
        },
        url: {
            type: String,
        }

    },
    { timestamps: true }
)

couponSchema.pre('save', async function (next) {
    if (this.code) {
        this.url = await qrcode.toDataURL(this.code)
    }
    next()
})

couponSchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.url = await qrcode.toDataURL(doc.code)
    next()
})


export const couponModel = model('coupon', couponSchema)