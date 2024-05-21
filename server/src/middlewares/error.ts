import { error } from "console"
import { RootError } from "../exceptions/root"
import { NextFunction, Request, Response } from "express"

export const errorCatcher = (err: RootError, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        return res.status(err.status).json({
            message: err.message,
            error: err.error,
            errors: err.errors
        })
    }
    next()
}