import { ERRORCODES, ErrorException, STATUSCODES } from "./root";

export class InternalException extends ErrorException {
    constructor(message: string, errorCode: ERRORCODES, statusCode: STATUSCODES, error: any) {
        super(message, errorCode, statusCode, error)
    }
}