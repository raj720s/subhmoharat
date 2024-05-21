import { ErrorCodes, RootError } from "./root"

export class BadRequest extends RootError {
    code: ErrorCodes
    constructor(message: string, code: ErrorCodes) {
        super(message, code, 400, null)
        this.code = code
    }
}