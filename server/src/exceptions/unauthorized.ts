import { ERRORCODES, ErrorException, STATUSCODES } from "./root";

export class UnauthorizedException extends ErrorException {
    constructor(message: string, errorCode: ERRORCODES, statusCode: STATUSCODES, error: any) {
        super(message, ERRORCODES.UNAUTHORIZED, STATUSCODES.UNAUTHORIZED, error)
    }
}