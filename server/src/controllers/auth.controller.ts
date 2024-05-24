import { NextFunction, Request, Response } from "express"
import { prisma } from "..";
import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequest } from "../exceptions/badRequest";
import { ErrorCodes, StatusCodes } from "../exceptions/root";
import { InvalidRequest } from "../exceptions/validation";
import { registerSchema } from "../schema/users";
export const register = async (req: Request, res: Response, next: NextFunction) => {
    // with generich catcher middlewareroute no need of try and catch 

    //validate

    registerSchema.parse(req.body)
    const { email, password, name } = req.body

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (user) {
        return next(new BadRequest("User already exist", ErrorCodes.USER_ALREADY_EXIST, StatusCodes.BAD_REQUEST, user))
    }
    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)

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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (!user) {
        throw Error("User not found")
    }

    if (!compareSync(password, user.password)) {
        throw Error("Wrong password")
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ user, token })
}

