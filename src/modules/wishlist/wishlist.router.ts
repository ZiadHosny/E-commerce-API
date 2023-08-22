import express from 'express'
import * as wishlist from './wishlist.controller.js'
import { allowedTo, checkAuthentication } from '../../middleware/authentication.middleware.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { wishlistSchema } from './wishlist.vaildation.js';

const wishlistRouter = express.Router();

wishlistRouter
    .route('/')
    .get(
        checkAuthentication,
        allowedTo('user'),
        wishlist.getAllUserWishlist,
    )
    .patch(
        validation(wishlistSchema, 'body'),
        checkAuthentication,
        allowedTo('user'),
        wishlist.addToWishlist,
    )
    .delete(
        validation(wishlistSchema, 'body'),
        checkAuthentication,
        allowedTo('user'),
        wishlist.removeFromWishlist,
    )

export default wishlistRouter;