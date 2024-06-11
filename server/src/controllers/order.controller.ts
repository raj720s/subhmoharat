import { skip } from "node:test"
import { prisma } from ".."
import { ERRORCODES, ErrorException, STATUSCODES } from "../exceptions/root"
import { UserReq } from "../middlewares/authorize"
import computeFormattedAddress from "../utils/formatAddress"

export const createOrder = async (req: UserReq, res: any) => {

    // create txn 
    // list all cartitems and  proceed
    // calc total
    //fetch address
    // define  computedfield  fir  formattedaddress on address module
    // create order  with orderProducts
    // create evetn for each product
    // empty existing cart

    try {
        return await prisma.$transaction(async (txn) => {
            const cartItems = await txn.cartItems.findMany({
                where: {
                    userId: req.user.id
                },
                include: {
                    product: true
                }
            })
            console.log({ cartItems })
            if (cartItems.length === 0) {
                throw new ErrorException('Cart is empty', ERRORCODES.BAD_REQUEST, STATUSCODES.BAD_REQUEST, null)
            }
            const price = cartItems.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0)
            const address = computeFormattedAddress(await prisma.address.findFirstOrThrow({
                where: {
                    id: Number(req.user.defaultAddress)
                }
            }))
            if (!address) {
                throw new ErrorException('Address not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
            }

            const order = await txn.order.create({
                data: {
                    userId: req.user.id,
                    amount: price,
                    address: address,
                    orderProducts: {
                        create: cartItems.map((item) => {
                            return {
                                quantity: item.quantity,
                                productId: item.productId
                            }
                        })
                    }
                }
            })

            const orderEvent = await txn.orderEvent.create({
                data: {
                    orderId: Number(order.id),
                }
            })

            if (!orderEvent) {
                throw new ErrorException('Failed to create order event', ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, null)
            }

            await txn.cartItems.deleteMany({
                where: {
                    userId: req.user.id
                }
            })
            return res.json(order)
        })
    } catch (error) {
        throw new ErrorException('Failed to create order', ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, error)
    }
}

export const listOrders = async (req: UserReq, res: any) => {

    const orders = await prisma.order.findMany({
        where: {
            userId: Number(req.user.id)
        }
    })
    res.json(orders)
}

export const cancelOrder = async (req: any, res: any) => {
    try {
        //  transactionaisedd ... 
        const orderTxn = await prisma.$transaction(async (txn) => {
            const order = await txn.order.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    status: "CANCELLED"
                }
            })
            const event = await txn.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: "CANCELLED"
                }
            })
            res.json({ order, event })
        })
    } catch (error) {
        throw new ErrorException('Something went wrong  ', ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, error)
    }
}


export const listAllOrders = async (req: any, res: any) => {
    let where: any = {}
    const status = req.query.status
    if (status) {
        where.status = status
    }
    const orders = await prisma.order.findMany({
        where: where,
        skip: Number(req.query.skip) || 0,
        take: 5
    })
    res.json(orders)
}

export const getOrderById = async (req: any, res: any) => {
    try {
        const order = await prisma.order.findFirstOrThrow({
            where: {
                id: Number(req.params.id)
            },
            include: {
                orderProducts: true,
                orderEvents: true
            }
        })

        if (!order) {
            throw new ErrorException('Order not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
        }
        res.json(order)
    } catch (error) {
        throw new ErrorException('Something went wrong  ', ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, error)
    }
}



export const listOrderByUser = async (req: any, res: any) => {
    const where: any = {}
    where.userId = Number(req.params.id)
    if (req.params.status) {
        where.status = req.params.status
    }
    const orders = await prisma.order.findMany({
        where: {
            ...where,
            skip: Number(req.query.skip || 0),
            take: 5

        }
    })
    res.json(orders)
}

export const changeOrderStatus = async (req: any, res: any) => {
    return await prisma.$transaction(async (txn) => {

        const order = await txn.order.
            update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    status: req.body.status
                }
            })
        await txn.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        })
        res.json(order)
    })
}