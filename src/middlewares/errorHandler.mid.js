const errorHandler = (error, req, res, next) => {
    const { statuscode, message } = error;
    console.error(error)
    return res.status(statuscode || 500).json({
        message: message || `${req.method} ${req.url} ${error.message}`,
    })
}

export default errorHandler
