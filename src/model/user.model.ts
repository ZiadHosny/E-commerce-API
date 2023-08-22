import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { getFromEnv } from "../utils/getFromEnv.js";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 2,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minLength: 2,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    age: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt: {
        type: Date,
    },
    logOutTime: {
        type: Date,
    },
    wishlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'product' }],
    addresses: [{
        city: String,
        street: String,
        phone: String
    }]
},
    {
        timestamps: true,
    }
)

userSchema.pre("save", function (next) {
    const { rounds } = getFromEnv()
    this.password = bcrypt.hashSync(this.password, rounds);
    next()
});

userSchema.pre("findOneAndUpdate", function (next) {
    const { rounds } = getFromEnv()
    const doc = this.getUpdate() as any

    if (doc.password) {
        doc.password = bcrypt.hashSync(doc.password, rounds)
    }
    next()
});

export const userModel = mongoose.model("user", userSchema);
