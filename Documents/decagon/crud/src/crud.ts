import express from "express"
import bodyParser from "body-parser"
import appRouter from "./routes/author"
const app = express()

app.use(bodyParser.json())
app.use("/", appRouter)

app.listen(2000, () => {
    console.log("the server is listening 2000")
})