import { categoryModel } from "../../model/category.model.js";
import { getOneById, deleteOneById, getAll, createOne, UpdateOneById } from "../handlers/factor.handlers.js";

export const getAllCategories = getAll(categoryModel)
export const createCategory = createOne({ model: categoryModel, imageKey: 'image' })
export const updateCategory = UpdateOneById({ model: categoryModel, route: "Category", imageKey: 'image' })
export const getCategoryById = getOneById(categoryModel, "Category")
export const deleteCategory = deleteOneById(categoryModel, "Category")
