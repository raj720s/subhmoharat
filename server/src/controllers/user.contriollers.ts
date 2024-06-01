import { Request, Response, NextFunction } from 'express'
import { AddressValidation } from '../Validations/addressValidatiosn'
import { ERRORCODES, ErrorException, STATUSCODES } from '../exceptions/root'
import { Address, User } from '@prisma/client'
import { prisma } from '..'
import { UserReq } from '../middlewares/authorize'
import { updateUserSchema } from '../Validations/users'
import { BadRequest } from '../exceptions/badRequest'

export const addAddress = async (req: UserReq, res: Response, next: NextFunction) => {
    // return console.log(req.body)
    AddressValidation.parse(req.body)

    try {
        let user: User = await prisma.user.findFirstOrThrow({
            where: {
                id: req.user.id
            }
        })
        if (user) {

            const address = await prisma.address.create({
                data: {
                    ...req.body,
                    userId: user.id
                }
            })

            res.json(address)
        } else {

            throw new ErrorException('User not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
        }
    } catch (error: any) {
        throw new ErrorException(error?.message, ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, error)
    }
}

export const listAddress = async (req: UserReq, res: Response, next: NextFunction) => {

    const addresses = await prisma.address.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(addresses)
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    try {
        const address = await prisma.address.delete({
            where: {
                id: Number(id)
            }
        })
        res.json({ message: 'address deleted successfully' })
    } catch (error) {
        throw new ErrorException('Address not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
    }

}


export const updateUser = async (req: UserReq, res: Response, next: NextFunction) => {
    try {
        const data = updateUserSchema.parse(req.body)
        let address: Address
        address = await prisma.address.findFirstOrThrow({
            where: {
                id: Number(data.defaultAddress)
            }
        })
        if (!address) {
            throw new ErrorException('Address not found', ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, null)
        }
        if (address.userId !== req.user.id) {
            throw new BadRequest('Address not Match', ERRORCODES.BAD_REQUEST, STATUSCODES.BAD_REQUEST, null)
        }
        const updatedAddress = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: data
        })
        res.json(updatedAddress)
    } catch (error: any) {
        throw new ErrorException(error.message, ERRORCODES.NOT_FOUND, STATUSCODES.NOT_FOUND, error)
    }
}