const jwt = require("jsonwebtoken")

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization")
    if(!authHeader){
        req.isAuth = false;
        req.isAdmin = false;
        return next()
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        req.isAuth = false;
        req.isAdmin = false;
        return next()
    }

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log("Decoded Token:", decodedToken)
    }catch(error){
        req.isAuth = false;
        req.isAdmin = false;
        return next()
    }

    if(!decodedToken){
        req.isAuth = false;
        req.isAdmin = false;
        return next()
    }

    req.isAuth = true
    req.userId = decodedToken.userId
    req.isAdmin = decodedToken.role === "admin" || false
    req.firstName = decodedToken.firstName
    req.lastName = decodedToken.lastName
    next()
}

module.exports = isAuth