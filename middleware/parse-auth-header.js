const parseAuthHeader = (req, res, next) => {
    if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        if (authHeader.split(' ').length > 1 && authHeader.split(' ')[0] === 'Bearer') {
            req.token = authHeader.split(' ')[1];
        }
    }

    next()
}

export default parseAuthHeader