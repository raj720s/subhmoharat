// message , stateus and  err  code handler 


export class ErrorHandler extends Error {

    message: string;
    statusCode: number
    errorCode: number;
    error: any

    constructor(message: string, errorCode: ErrorCodes, statusCode: StatusCodes, error: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.error = error
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
    TOKEN_EXPIRED = 1008,
    INVALID_REQUEST = 1009,
}

export enum StatusCodes {
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    REDIRECT = 303,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,

}