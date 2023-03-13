const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}


const customErrorHandler = (error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message ||"This is server side error";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        ...(process.env.DEBUG_MODE === "true" && {stack: error.stack}),
    });
}


module.exports = {
    createError,
    customErrorHandler
}