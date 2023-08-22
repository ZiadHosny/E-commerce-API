import { Schema, model } from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";
import slugify from "slugify";

const brandSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 2,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        // required: true,
    },
    logo: {
        type: String,
    },
}, {
    timestamps: true
})

brandSchema.pre('save', function (next) {
    this.slug = slugify.default(this.name)
    next()
})

brandSchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.slug = slugify.default(doc.name)
    next()
})

brandSchema.post("init", (document) => {
    const { baseUrlWithPort } = getFromEnv()
    if (document.logo) {
        document.logo = `${baseUrlWithPort}/Brand/${document.logo}`;
    }
});

export const brandModel = model('brand', brandSchema)