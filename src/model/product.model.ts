import { Schema, model, Types } from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";
import slugify from "slugify";

const productSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            minLength: 2,
        },
        slug: {
            type: String,
            lowercase: true,
            // required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        priceAfterDiscount: {
            type: Number,
            min: 0
        },
        ratingAvg: {
            type: Number,
            min: [1, "rating average must be greater than 1"],
            max: [5, "rating average must be less than 1"],
        },
        ratingCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        description: {
            type: String,
            minLength: [5, "too short product description"],
            maxLength: [300, "too long product description"],
            required: [true, "product description required"],
            trim: true,
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0,
            required: [true, "product quantity required"],
        },
        sold: {
            type: Number,
            default: 0,
            min: 0,
        },
        imgCover: {
            type: String,
        },
        images: [{ type: String }],
        category: {
            type: Types.ObjectId,
            ref: "category",
            required: true,
        },
        subCategory: {
            type: Types.ObjectId,
            ref: "subCategory",
            required: true,
        },
        brand: {
            type: Types.ObjectId,
            ref: "brand",
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

productSchema.pre('save', function (next) {
    this.slug = slugify.default(this.name)
    next()
})

productSchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.slug = slugify.default(doc.name)
    next()
})

productSchema.post('init', (document) => {
    const { baseUrlWithPort } = getFromEnv()
    if (document.imgCover) {
        document.imgCover = `${baseUrlWithPort}/Products/${document.imgCover}`;
    }
    if (document.images) {
        document.images = document.images.map((img: string) => `${baseUrlWithPort}/Products/${img}`)
    }
})

productSchema.virtual("productReviews", {
    ref: "review",
    localField: "_id",
    foreignField: "product",
});

productSchema.pre(['find', 'findOne'], function () {
    this.populate("productReviews");
});

export const productModel = model('product', productSchema)