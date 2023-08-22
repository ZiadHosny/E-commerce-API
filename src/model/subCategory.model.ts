import { Schema, model, Types } from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";
import slugify from "slugify";

const subCategorySchema: Schema = new Schema(
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
            unique: true,
            // required: true,
        },
        image: {
            type: String,
        },
        category: {
            type: Types.ObjectId,
            ref: "category",
        },
    },
    { timestamps: true },
)

subCategorySchema.pre('save', function (next) {
    this.slug = slugify.default(this.name)
    next()
})

subCategorySchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.slug = slugify.default(doc.name)
    next()
})

subCategorySchema.post("init", (document) => {
    const { baseUrlWithPort } = getFromEnv()

    if (document.image) {
        document.image = `${baseUrlWithPort}/Subcategory/${document.image}`;
    }
});

export const subCategoryModel = model('subCategory', subCategorySchema)