import { NextFunction, Request, Response } from "express"
import { ErrorCodes, ErrorHandler, StatusCodes } from "../exceptions/root"
import { InternalException } from "../exceptions/internalException"

// generic error handler
export const errorMiddleware = (controller: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            controller(req, res, next)
        } catch (error: any) {
            let ex: ErrorHandler
            if (error instanceof ErrorHandler) {
                ex = error
            } else {
                ex = new InternalException('Something went wrong', ErrorCodes.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR, error)
            }
            next(ex)
        }
    }
}