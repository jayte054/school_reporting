const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const userJwt = require("../../helpers/jwt")

const authResolver = {
    createUser: async(args) => {
        console.log("a")
        console.log(args.CreateUserInput.firstName)
        try{
            const existingUser = await User.findOne({email: args.CreateUserInput.email})
            if(existingUser){
                throw new Error("User already exists")
            } 
                const hashedPassword = await bcrypt.hash(args.CreateUserInput.password, 12)
                const user = new User({
                    firstName: args.CreateUserInput.firstName,
                    lastName: args.CreateUserInput.lastName,
                    role: args.CreateUserInput.role,
                    email: args.CreateUserInput.email,
                    password: hashedPassword
                })

                await user.save()
                const newUser = user
                return {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    role: newUser.role
                }

               
        }catch(error) {
            console.log(error)
            throw error
        }
    },

    getUsers: async (req) => {
        console.log("users")
        const result = await User.find()
        try{
            return result.map((user) => ({
                _id: user._id,
               firstName: user.firstName,
               lastName: user.lastName,
               role: user.role,
               email: user.email
            }))
        }catch(error){
            throw error
        }
    },

    getUserById: async({_id}) => {
        const result = await User.findById(_id)
        try {
            return {
                _id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                role: result.role,
                email: result.email
            }
        } catch(error){
            console.log(error)
        }
    },
    
    userLogin: async(args) => {
        try{
            const user = await User.findOne({email: args.LoginInput.email})
            if(!user){
                throw new Error("User does not exist")
            }
    
            const truePassword = await bcrypt.compare(args.LoginInput.password, user.password);
            if(!truePassword){
                throw new Error("incorrect password")
            }
    
            const token = await userJwt({email: user.email, role: user.role})
    
            return ({
                userId: user._id,
                role: user.role,
                token: token,
                tokenExpiration: 2
            })
        }catch(error){
            console.log(error)
            throw error
        }
       
    },

}
module.exports = authResolver