import { getOneById, deleteOneById, getAll, createOne, UpdateOneById } from "../handlers/factor.handlers.js";
import { productModel } from "../../model/product.model.js";

const imageskeys = [{ imgKey: 'imgCover', multi: false }, { imgKey: 'images', multi: true }]

export const getAllProducts = getAll(productModel)
export const createProduct = createOne({ model: productModel, imageskeys })
export const updateProduct = UpdateOneById({ model: productModel, route: "Product", imageskeys })
export const getProductById = getOneById(productModel, "Product")
export const deleteProduct = deleteOneById(productModel, "Product")