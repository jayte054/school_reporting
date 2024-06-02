const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

 const database =  async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@jayte.qifrq5d.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=jayte`,
            {
                ssl: true,
                tlsAllowInvalidCertificates: false,
                tlsAllowInvalidHostnames: false,
            }
        )
        
    }catch(error){
        console.log(error, `error connecting to ${process.env.MONGO_Db}`)
    }
};

database()

module.exports = database