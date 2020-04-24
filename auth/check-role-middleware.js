module.exports = role => {
    return function (req, res, next) {
        if (req.decodedToken.roles && req.decodedToken.roles.includes(role)) {
            next();
        }
        // gives ADMIN rights to do everything
        else if (req.decodedToken.roles && req.decodedToken.roles.includes('ADMIN')) {
            next();
        }
        else {
            res.status(403).json({ message: 'you do not have permission' })
        }
    }
}
