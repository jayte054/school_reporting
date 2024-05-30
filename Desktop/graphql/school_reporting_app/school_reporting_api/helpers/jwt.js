const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const User = require("../models/user.model");

// dotenv.config()
// console.log(process.env.SECRET_KEY)
// console.log("a")


const userJwt = async({userId, email, role}) => {
    
    try{
        const user = await User.findOne({userId, email, role});

        const token = jwt.sign({userId: user._id, email: user.email, role: user.role}, process.env.SECRET_KEY, {
            expiresIn: "2h"
        })
        return token
    }catch(error){
        console.log("error generating JWT:", error)
        return null
    }
   
}


module.exports = userJwt