import { Product } from "@prisma/client"
import { cartSchema, updateCartSchmea } from "../Validations/cartValidations"
import { ERRORCODES, ErrorException, STATUSCODES } from "../exceptions/root"
import { UserReq } from "../middlewares/authorize"
import { Request, Response, NextFunction } from 'express'
import { prisma } from ".."

export const addItemTocart = async (req: UserReq, res: Response, next: NextFunction) => {

    try {
        const validCart = cartSchema.parse(req.body)
        let product: Product

        product = await prisma.product.findFirstOrThrow({
            where: {
                id: validCart.productId
            }
        })
        if (product) {

            const cart = await prisma.cartItems.create({
                data: {
                    ...validCart,
                    userId: req.user.id
                }
            })
            res.json(cart)
        } else {
            throw new ErrorException('Product not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
        }
    } catch (error) {
        throw new ErrorException('Invalid Request', ERRORCODES.INVALID_REQUEST, STATUSCODES.BAD_REQUEST, error)
    }
}

export const deleteItemFromCart = async (req: UserReq, res: Response, next: NextFunction) => {
    // check if user id is matching the cart user id
    await prisma.cartItems.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ message: 'Item deleted successfully' })
}

export const changeQuantity = async (req: UserReq, res: Response, next: NextFunction) => {
    const validCartData = updateCartSchmea.parse(req.body)
    const updateCart = await prisma.cartItems.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            quantity: validCartData.quantity
        }
    })
    res.json(updateCart)
}

export const getCartItems = async (req: UserReq, res: Response, next: NextFunction) => {
    const cart = await prisma.cartItems.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    })
    res.json(cart)
}