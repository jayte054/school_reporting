const contextHelper = (req) => ({
        isAuth: req.isAuth,
        isAdmin: req.isAdmin,
        userId: req.userId,
        firstName: req.firstName,
        lastName: req.lastName
})

module.exports = contextHelper