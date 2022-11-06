import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(express.json())
app.use(bodyParser.json())
import {getAuthor, createAuthor, getIdAuthor, deleteAuthor, updateAuthor} from "../controllers/crud"


app.get("/", getAuthor)

app.post("/user", createAuthor)


app.get("/user/:id", getIdAuthor)

app.delete("/user/:id", deleteAuthor) 

app.put("/user/:id", updateAuthor)


export default app

