import { Schema, model } from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";
import slugify from "slugify";

const categorySchema: Schema = new Schema(
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

    },
    { timestamps: true }
)

categorySchema.pre('save', function (next) {
    this.slug = slugify.default(this.name)
    next()
})

categorySchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.slug = slugify.default(doc.name)
    next()
})

categorySchema.post("init", (document) => {
    const { baseUrlWithPort } = getFromEnv()
    if (document.image) {
        document.image = `${baseUrlWithPort}/Category/${document.image}`;
    }
});


export const categoryModel = model('category', categorySchema)