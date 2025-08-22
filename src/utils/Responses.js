export const successResponse  = (res, data) => {
    res.status(200).json({success: true, data});
}

export const errorResponse = (res, message, statusCode = 400) => {
    res.status(statusCode).json({success: false, error: message});
}