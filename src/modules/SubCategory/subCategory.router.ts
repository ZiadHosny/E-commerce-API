import express from 'express'
import * as subCategory from './subCategory.controller.js'
import { uploadSingleImage } from '../../middleware/fileUploader/imageUploader.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { subCategorySchema } from './subCategory.validation.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
    .route('/')
    .get(subCategory.getAllSubCategories)
    .post(
        uploadSingleImage('image', 'Subcategory'),
        validation(subCategorySchema, 'body'),
        subCategory.createSubCategory
    )

subCategoryRouter
    .route('/:id')
    .get(subCategory.getSubCategoryById)
    .put(
        uploadSingleImage('image', 'Subcategory'),
        validationId(),
        validation(subCategorySchema, 'body'),
        subCategory.updateSubCategory
    )
    .delete(subCategory.deleteSubCategory)

export default subCategoryRouter;