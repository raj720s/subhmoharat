import { any } from "zod"
import { ErrorCodes, ErrorHandler, StatusCodes } from "./root"

export class InvalidRequest extends ErrorHandler {
    constructor(message: string, errorCode: ErrorCodes, statusCode: StatusCodes, error: any) {
        super(message, errorCode, statusCode, error)

    }
}