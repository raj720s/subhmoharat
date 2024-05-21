// message , stateus and  err  code handler 

export class RootError extends Error {
    message: string
    status: number
    error: ErrorCodes
    errors: any

    constructor(message: string, status: number, error: ErrorCodes, errors: any) {
        super(message)
        this.message = message
        this.error = error
        this.status = status
        this.errors = errors
    }
}

export enum ErrorCodes {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    USER_NOT_FOUND = 1004,
    USER_ALREADY_EXIST = 1005,
    INCORRECT_PASSWORD = 1006,
    INVALID_TOKEN = 1007,
    TOKEN_EXPIRED = 1008
}