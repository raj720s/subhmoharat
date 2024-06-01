import { NextFunction, Request, Response } from "express"
import { ERRORCODES, ErrorException, STATUSCODES } from "../exceptions/root"
import { InternalException } from "../exceptions/internalException"
import { ZodError } from "zod"
import { InvalidError } from "../exceptions/validation"


// generic error handler
export const asyncMiddleware = (controller: Function) => {
    // wraps the controller functions 
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next)
        } catch (error: any) {
            console.log(error)
            let ex;
            if (error instanceof ErrorException) {
                ex = error
            }
            else {
                if (error instanceof ZodError) {
                    console.log({ error })
                    ex = new InvalidError('Invalid request', ERRORCODES.INVALID_REQUEST, STATUSCODES.BAD_REQUEST, error)
                }
                else {
                    ex = new InternalException('Something went wrong', ERRORCODES.INTERNAL_SERVER_ERROR, STATUSCODES.INTERNAL_SERVER_ERROR, error)

                }
            }
            next(ex)
        }
    }
}