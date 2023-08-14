import { NextFunction, Request, Response } from "express"
import { AppError, catchAsyncError } from "../../utils/ErrorHandler.js"
import { Model } from "mongoose"
import { ApiFeature } from "../../utils/ApiFeature.js"

export const getAll = (model: Model<any>, key?: string, idKey?: string) => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        let filter = {}

        const id = req.params[idKey ?? '']
        if (key && id) {
            filter = { [key]: id }
        }

        const apiFeature = new ApiFeature(model.find(filter, { __v: 0, password: 0 }), req)
            .paginate().fields().sort().filter().search()

        const result = await apiFeature.mongooseQuery

        res.status(200).send({ message: "success", page: apiFeature.page, data: result })
    })
}

export const createOne = ({ model, imageKey, imageskeys = [] }:
    { model: Model<any>, imageKey?: string, imageskeys?: { imgKey: string, multi: boolean }[] }) => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        const image = req.file?.filename
        const images = req.files as any

        if (imageKey && image) {
            req.body[imageKey] = image
        }
        if (imageskeys.length > 0 && images) {
            imageskeys.map(({ imgKey, multi }) => {
                if (images[imgKey]) {
                    req.body[imgKey] = multi ?
                        images[imgKey].map((img: any) => img.filename)
                        : images[imgKey][0].filename
                }
            })
        }

        const result = new model({ ...req.body })

        await result.save()

        res.status(200).send({ message: "success", data: result })
    })
}

export const getOneById = (model: Model<any>, route?: string) => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        const result = await model.findById(id, { __v: 0, password: 0 });

        if (!result) {
            return next(new AppError(`This ${route} Not Found`, 404))
        }

        res.status(200).send({ message: "success", data: result })
    })
}

export const deleteOneById = (model: Model<any>, route?: string) => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        const result = await model.findByIdAndDelete(id, { returnOriginal: true })

        if (!result) {
            return next(new AppError(`This ${route} Not Found`, 404))
        }

        res.status(200).send({ message: "success", data: result })
    })
}

export const UpdateOneById = ({ model, route, imageKey, imageskeys = [] }:
    { model: Model<any>, route?: string, imageKey?: string, imageskeys?: { imgKey: string, multi: boolean }[] }) => {
    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params

        const image = req.file?.filename
        const images = req.files as any

        if (imageKey && image) {
            req.body[imageKey] = image
        }
        if (imageskeys.length > 0 && images) {
            imageskeys.map(({ imgKey, multi }) => {
                if (images[imgKey]) {
                    req.body[imgKey] = multi ?
                        images[imgKey].map((img: any) => img.filename)
                        : images[imgKey][0].filename
                }
            })
        }

        const result = await model.findByIdAndUpdate(id, { ...req.body }, { __v: 0, password: 0, new: true })

        if (!result) {
            return next(new AppError(`This ${route} Not Found`, 404))
        }

        res.status(200).send({ message: "success", data: result })
    })
}
