import { Product } from "@prisma/client"
import { cartSchema, updateCartSchmea } from "../Validations/cartValidations"
import { ERRORCODES, ErrorException, STATUSCODES } from "../exceptions/root"
import { UserReq } from "../middlewares/authorize"
import { Request, Response, NextFunction } from 'express'
import { prisma } from ".."

export const addItemTocart = async (req: UserReq, res: Response, next: NextFunction) => {
    // check if  cartitem is already existin for the user then  add the quantity only

    try {
        const validCart = cartSchema.parse(req.body)
        let product: Product

        const cartItem = await prisma.cartItems.findFirst({
            where: {
                productId: validCart.productId,
                userId: req.user.id
            }
        })
        if (cartItem) {
            const updatedQuantity = cartItem.quantity + validCart.quantity
            await prisma.cartItems.update({
                where: {
                    id: cartItem.id
                },
                data: {
                    quantity: updatedQuantity
                }
            })
            return res.json({ message: 'Cart item updated successfully', cartItem })
        }

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
    try {
        await prisma.cartItems.delete({
            where: {
                id: Number(req.params.id),
                userId: req.user.id
            }
        })
        res.json({ message: 'Item deleted from cart successfully', cartItem: req.params.id })
    } catch (error) {
        throw new ErrorException('invalid  something', ERRORCODES.INVALID_REQUEST, STATUSCODES.INTERNAL_SERVER_ERROR, error)
    }
}

export const changeQuantity = async (req: UserReq, res: Response, next: NextFunction) => {
    const validatedQuantity = updateCartSchmea.parse(req.body)
    const updatedCart = await prisma.cartItems.update({
        where: {
            id: Number(req.params.id),
            userId: req.user.id
        },
        data: {
            quantity: validatedQuantity.quantity
        }
    })
    res.json({ updatedCart })
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