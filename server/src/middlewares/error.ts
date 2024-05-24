import { error } from "console"
import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../exceptions/root"

export const errorCatcher = (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {

    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        error: error.error
    })

}