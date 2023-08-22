import express from 'express'
import * as brand from './brand,controller.js'
import { uploadSingleImage } from '../../middleware/fileUploader/imageUploader.js';
import { brandSchema, } from './brand.validation.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';

const brandRouter = express.Router();

brandRouter
    .route('/')
    .get(brand.getAllBrands)
    .post(
        uploadSingleImage('logo', 'brand'),
        validation(brandSchema, 'body'),
        brand.createBrand
    )

brandRouter
    .route('/:id')
    .get(brand.getBrandById)
    .put(
        uploadSingleImage('logo', 'brand'),
        validationId(),
        validation(brandSchema, 'body'),
        brand.updateBrand
    )
    .delete(brand.deleteBrand)

export default brandRouter;