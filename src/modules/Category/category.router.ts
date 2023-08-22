import express from 'express'
import * as category from './category.controller.js'
import { uploadSingleImage } from '../../middleware/fileUploader/imageUploader.js';
import { categorySchema } from './category.validation.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import subCategoryRouter from '../SubCategory/subCategory.router.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategory", subCategoryRouter);

categoryRouter
    .route('/')
    .get(category.getAllCategories)
    .post(
        uploadSingleImage('image', 'Category'),
        validation(categorySchema, 'body'),
        category.createCategory
    )

categoryRouter
    .route('/:id')
    .get(validationId(), category.getCategoryById)
    .put(
        uploadSingleImage('image', 'Category'),
        validationId(),
        validation(categorySchema, 'body'),
        category.updateCategory
    )
    .delete(category.deleteCategory)

export default categoryRouter;