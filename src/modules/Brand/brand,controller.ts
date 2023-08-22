import { brandModel } from "../../model/brand.model.js";
import { getOneById, deleteOneById, getAll, UpdateOneById, createOne } from "../handlers/factor.handlers.js";

export const getAllBrands = getAll(brandModel)
export const createBrand = createOne({ model: brandModel, imageKey: 'logo' })
export const updateBrand = UpdateOneById({ model: brandModel, route: "Brand", imageKey: 'logo' })
export const getBrandById = getOneById(brandModel, "Brand")
export const deleteBrand = deleteOneById(brandModel, "Brand")

