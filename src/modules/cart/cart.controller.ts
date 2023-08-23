import { NextFunction, Response } from "express";
import { productModel } from "../../model/product.model.js";
import { AppError, catchAsyncError } from "../../utils/ErrorHandler.js";
import { cartModel } from "../../model/cart.model.js";
import { RequestAuth } from "../../utils/types.js";
import { couponModel } from "../../model/coupon.model.js";

const calTotalPrice = (cart: any) => {
    let totalPrice = 0;
    cart.cartItems.forEach((elm: any) => {
        totalPrice += elm.quantity * elm.price
    })
    cart.totalPrice = totalPrice;
}

const calTotalPriceAfterDiscount = (cart: any) => {
    if (cart.discount) {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    }
}

export const addProductToCart = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {

    const product = await productModel.findById(req.body.product).select('price');

    if (!product) return next(new AppError('product not found', 401))

    req.body.price = product.price;

    const isCartExist = await cartModel.findOne({ user: req.user._id });

    if (!isCartExist) {

        const cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body],
        });
        calTotalPrice(cart)

        await cart.save();

        return res.json({ message: "success", cart });
    }
    const item = isCartExist.cartItems.find(
        (elm: any) => elm.product == req.body.product
    );
    if (item) {
        item.quantity += 1;
    } else {
        isCartExist.cartItems.push(req.body)
    }
    calTotalPrice(isCartExist)
    calTotalPriceAfterDiscount(isCartExist)

    await isCartExist.save();
    return res.json({ message: "success", cart: isCartExist });
});

export const removeProductFromCart = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true });

    if (!cart) return next(new AppError('Your Cart Is Empty', 404))

    calTotalPrice(cart)
    calTotalPriceAfterDiscount(cart)

    await cart.save();
    res.json({ message: "success", cart });
});

export const updateQuantity = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    let product = await productModel.findById(req.params.id).select('price');

    if (!product) return next(new AppError('product not found', 404))

    let isCartExist = await cartModel.findOne({ user: req.user._id });

    if (!isCartExist) {
        return next(new AppError('Your Cart Is Empty', 404))
    }

    let item = isCartExist.cartItems.find(
        (elm: any) => elm.product == req.params.id
    );
    if (item) {
        item.quantity = req.body.quantity;
    }
    calTotalPrice(isCartExist)
    calTotalPriceAfterDiscount(isCartExist)
    await isCartExist.save();
    return res.json({ message: "success", cart: isCartExist });
});

export const applyCoupon = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {
    const coupon = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) return next(new AppError('Cart not found', 401))

    if (!coupon) return next(new AppError('coupon not found', 401))

    if (coupon.discount) {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
        cart.discount = coupon.discount
    }
    await cart.save()
    res.status(201).json({ message: "success", cart })

});

export const getLoggedUserCart = catchAsyncError(async (req: RequestAuth, res: Response, next: NextFunction) => {

    const cartItems = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')

    if (!cartItems) {
        return next(new AppError('Your Cart Is Empty', 404))
    }

    res.status(201).json({ message: "success", cart: cartItems });
});
