import { ERRORCODES, ErrorException, STATUSCODES } from "./root"

export class InvalidRoute extends ErrorException {
    constructor(message: string, errorCode: ERRORCODES, statusCode: STATUSCODES, error: any) {
        super(message, errorCode, statusCode, null)
    }
}