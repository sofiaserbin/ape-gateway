const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500);
    return res.send("Internal Server Error")
}

export default errorHandler