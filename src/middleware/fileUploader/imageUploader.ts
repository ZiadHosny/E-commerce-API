import { v4 as uuid } from "uuid";
import { Request } from "express";
import multer from "multer";
import { AppError } from "../../utils/ErrorHandler.js";

const options = (path: string) => {

    const storage = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: Function
        ) => {
            cb(null, `Uploads/${path}/`);
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: Function
        ) => {
            cb(null, `${uuid()}_${file.originalname}`);
        },
    })

    return multer({ storage, fileFilter })
}

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: Function
) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new AppError('The file should be an image type', 400), false);
};

export const uploadSingleImage = (field: string, path: string) => {

    return options(path).single(field)
}

export const uploadMultipleImage = (fields: { name: string; maxCount: number }[], path: string) => {

    return options(path).fields(fields);
}