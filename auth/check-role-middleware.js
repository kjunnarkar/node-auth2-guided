module.exports = role => {
    return function (req, res, next) {
        if (req.decodedToken.roles && req.decodedToken.roles.includes(role)) {
            next();
        }
        else {
            res.status(403).json({ message: 'you do not have permission' })
        }
    }
}