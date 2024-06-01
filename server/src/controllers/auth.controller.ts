import { NextFunction, Request, Response } from "express"
import { prisma } from "..";
import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequest } from "../exceptions/badRequest";
import { ERRORCODES, ErrorException, STATUSCODES } from "../exceptions/root";
import { registerSchema } from "../Validations/users";
import { ZodError } from "zod";
import { InvalidError } from "../exceptions/validation";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const body = registerSchema.parse(req.body)
    const { email, password, name } = body
    let user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (user) {
        return next(new BadRequest('User already exist', ERRORCODES.USER_ALREADY_EXIST, STATUSCODES.BAD_REQUEST, user))
    }
    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    return res.json(user)
}
// export const register = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         //validate

//         registerSchema.parse(req.body)

//         const { email, password, name } = req.body

//         let user = await prisma.user.findFirst({
//             where: {
//                 email
//             }
//         })
//         if (user) {
//             return next(new BadRequest("User already exist", ErrorCodes.USER_ALREADY_EXIST, StatusCodes.BAD_REQUEST, user))
//         }
//         user = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password: hashSync(password, 10)
//             }
//         })
//         res.json(user)
//     } catch (error: any) {
//         console.log(error)
//         return next(new InvalidRequest(error?.errors[0]?.message, ErrorCodes.INVALID_REQUEST, StatusCodes.BAD_REQUEST, error?.errors))
//     }
// }

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (!user) {
        return next(new ErrorException('User not found', ERRORCODES.USER_NOT_FOUND, STATUSCODES.NOT_FOUND, null))
    }

    if (!compareSync(password, user.password)) {
        return next(new ErrorException('Incorrect password', ERRORCODES.INCORRECT_PASSWORD, STATUSCODES.BAD_REQUEST, null))
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ user, token })
}

// me  api  return logged in user 

export const me = (req: any, res: Response, next: NextFunction) => {
    res.json(req.user)
}

