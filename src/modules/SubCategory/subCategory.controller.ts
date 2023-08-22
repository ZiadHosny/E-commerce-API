import { subCategoryModel } from "../../model/subCategory.model.js";
import { getOneById, deleteOneById, getAll, createOne, UpdateOneById } from "../handlers/factor.handlers.js";

export const getAllSubCategories = getAll(subCategoryModel, "category", "categoryId")
export const createSubCategory = createOne({ model: subCategoryModel, imageKey: 'image' })
export const updateSubCategory = UpdateOneById({ model: subCategoryModel, route : "SubCategory" , imageKey: 'image'})
export const getSubCategoryById = getOneById(subCategoryModel, "SubCategory")
export const deleteSubCategory = deleteOneById(subCategoryModel, "SubCategory")