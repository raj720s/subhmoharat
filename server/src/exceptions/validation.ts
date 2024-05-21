import { ErrorCodes } from "./root"

export class InvalidRequest extends Error {
    code: ErrorCodes
    constructor(message: string, code: ErrorCodes) {
        super(message)
        this.code = code
    }
}