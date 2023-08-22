import express from 'express'
import * as review from './review.controller.js'
import { validation } from '../../middleware/validation/validation.middleware.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';
import { reviewSchemaCreate, reviewSchemaUpdate } from './review.vaildation.js';
import { allowedTo, checkAuthentication } from '../../middleware/authentication.middleware.js';

const reviewRouter = express.Router();

reviewRouter
    .route('/')
    .get(review.getAllreviews)
    .post(
        checkAuthentication,
        allowedTo('user'),
        validation(reviewSchemaCreate, 'body'),
        review.createReview
    )

reviewRouter
    .route('/:id')
    .get(review.getReviewById)
    .put(
        checkAuthentication,
        allowedTo('user'),
        validationId(),
        validation(reviewSchemaUpdate, 'body'),
        review.updateReview
    )
    .delete(
        checkAuthentication,
        allowedTo('user'),
        review.deleteReview
    )

export default reviewRouter;