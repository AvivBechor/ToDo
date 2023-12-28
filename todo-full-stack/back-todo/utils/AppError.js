class AppError extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode || 500;
        this.isOperational = true
    }
}

module.exports = AppError