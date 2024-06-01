import { Request, Response, NextFunction } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized"
import { ERRORCODES, STATUSCODES } from "../exceptions/root"
import *  as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import { prisma } from ".."

export interface UserReq extends Request {
    user?: any
}

export const authMiddleware = async (req: UserReq, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization
    // return console.log(token)
    if (!token) {
        return next(new UnauthorizedException('Unauthorized', ERRORCODES.UNAUTHORIZED, STATUSCODES.UNAUTHORIZED, null))
    }
    try {
        const payload: any = jwt.verify(token, JWT_SECRET)

        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        if (user) {
            req.user = user
            return next()
        }
        if (!user) {
            return next(new UnauthorizedException('Unauthorized', ERRORCODES.UNAUTHORIZED, STATUSCODES.UNAUTHORIZED, null))
        }
    } catch (error) {
        return next(new UnauthorizedException('Unauthorized', ERRORCODES.UNAUTHORIZED, STATUSCODES.UNAUTHORIZED, null))

    }
}

export const adminAuthMiddleware = async (req: UserReq, res: Response, next: NextFunction) => {

    const user = req.user
    if (user.role === 'ADMIN') {
        next()
    } else {
        return next(new UnauthorizedException('Unauthorized', ERRORCODES.UNAUTHORIZED, STATUSCODES.UNAUTHORIZED, null))
    }


}

