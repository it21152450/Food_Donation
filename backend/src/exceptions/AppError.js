const HttpCode = {
    OK : 200,
    NO_CONTENT : 204,
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    NOT_FOUND : 404,
    ALREADY_EXISTS : 403,
    INTERNAL_SERVER_ERROR : 500,
}

class AppError extends Error {
    name;
    httpCode;
    isOperational = true;

    constructor(args) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || 'Error';
        this.httpCode = args.httpCode;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}

module.exports = {AppError, HttpCode};