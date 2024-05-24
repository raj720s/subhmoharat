import { ErrorCodes, ErrorHandler, StatusCodes } from "./root";

export class InternalException extends ErrorHandler {
    constructor(message: string, errorCode: ErrorCodes, statusCode: StatusCodes, error: any) {
        super(message, errorCode, statusCode, error)
    }
}