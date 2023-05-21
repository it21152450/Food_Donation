const { AppError, HttpCode } =  require("./AppError");

class ErrorHandler {
    isTrustedError(error) {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
             this.handleTrustedError(error, response);
        } else {
             this.handleCriticalError(error, response);
        }
    }

    handleTrustedError(error, response) {
        const message = error.message;
        response.status(error.httpCode).json({ message });
    }

    handleCriticalError(error, response) {
        if (response) {
            response
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal server error' });
        }
        console.log(error);
        console.error('Application encountered a critical error.');
        // process.exit(1);
    }
}

const errorHandler = new ErrorHandler();

module.exports = {errorHandler};