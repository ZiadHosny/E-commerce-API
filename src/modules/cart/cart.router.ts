import express from 'express'
import * as cart from './cart.controller.js'
import { allowedTo, checkAuthentication } from '../../middleware/authentication.middleware.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import { cartApplyCoupon, cartSchemaCreate, cartSchemaUpdate } from './cart.vaildation.js';
import { validationId } from '../../middleware/validation/validationId.middleware..js';

const cartRouter = express.Router();

cartRouter
    .route('/')
    .post(
        validation(cartSchemaCreate, 'body'),
        checkAuthentication,
        allowedTo('user'),
        cart.addProductToCart,
    ).get(
        checkAuthentication,
        allowedTo("user"),
        cart.getLoggedUserCart
    )

cartRouter.post('/applyCoupon',
    validation(cartApplyCoupon, 'body'),
    checkAuthentication,
    allowedTo("user"),
    cart.applyCoupon
)


cartRouter
    .route("/:id")
    .delete(
        checkAuthentication,
        allowedTo("admin", "user"),
        cart.removeProductFromCart
    )
    .put(
        validation(cartSchemaUpdate, 'body'),
        checkAuthentication,
        allowedTo("user"),
        cart.updateQuantity
    )

export default cartRouter