import { Request, Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequest } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }

    })
    if (user) {
        throw new BadRequest("User already exist", ErrorCodes.USER_ALREADY_EXIST)
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await prismaClient.user.findFirst({
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

