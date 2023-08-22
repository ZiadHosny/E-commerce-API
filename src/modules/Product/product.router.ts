import express from 'express'
import * as product from './product.controller.js'
import { uploadMultipleImage } from '../../middleware/fileUploader/imageUploader.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { productSchema } from './product.vaildation.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';

const productRouter = express.Router();

const fieldsArray = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]

productRouter
    .route('/')
    .get(product.getAllProducts)
    .post(
        uploadMultipleImage(fieldsArray, 'Products'),
        validation(productSchema, 'body'),
        product.createProduct
    )

productRouter
    .route('/:id')
    .get(product.getProductById)
    .put(
        uploadMultipleImage(fieldsArray, 'Products'),
        validationId(),
        validation(productSchema, 'body'),
        product.updateProduct
    )
    .delete(product.deleteProduct)

export default productRouter;