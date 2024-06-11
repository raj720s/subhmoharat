import { Request, Response, NextFunction } from 'express'
import { prisma } from '..'
import { ERRORCODES, ErrorException, STATUSCODES } from '../exceptions/root'
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product = await prisma.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join('.')
        }
    })
    res.json({ product })
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    if (data.tags) {
        data.tags = data.tags.join(',')
    }
    const updated = await prisma.product.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    })
    res.json({ updated })
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product = await prisma.product.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json({ product })
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const count = await prisma.product.count()
    const pageSize = Number(req.query.pageSize) || 10
    const products = await prisma.product.findMany({
        skip: Number(req.query.skip) || 0,
        take: 5
    })
    res.json({ count, data: products })
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!product) {
            return (next(new ErrorException('Product not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)))
        }
        res.json({ product })

    } catch (error) {
        return (next(new ErrorException('Product not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)))


    }

}


export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                search: req.query.q?.toString()
            },
            desc: {
                search: req.query.q?.toString()

            }
            , tags: {
                search: req.query.q?.toString()

            }

        }
    })
    res.json({ products }) // count, data: products
}