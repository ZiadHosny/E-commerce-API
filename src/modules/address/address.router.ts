import express from 'express'
import * as address from './address.controller.js'
import { allowedTo, checkAuthentication } from '../../middleware/authentication.middleware.js';
import { validation } from '../../middleware/validation/validation.middleware.js';
import {addressSchemaCreate, addressSchemaDelete } from './address.vaildation.js';

const addressRouter = express.Router();

addressRouter
    .route('/')
    .get(
        checkAuthentication,
        allowedTo('user'),
        address.getAllUserAddress,
    )
    .patch(
        validation(addressSchemaCreate, 'body'),
        checkAuthentication,
        allowedTo('user'),
        address.addAddress,
    )
    .delete(
        validation(addressSchemaDelete, 'body'),
        checkAuthentication,
        allowedTo('user'),
        address.removeFromAddress,
    )

export default addressRouter;