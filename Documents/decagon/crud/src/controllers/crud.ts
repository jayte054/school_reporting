import express   from "express"
import {v4 as uuidv4} from "uuid"

const app = express()
app.use(express.json())

let data = [
    {
    "message": "hello to the freaking holiday",
    "author" : "ben davies",
    "id": uuidv4()
},
{
    "message": "hello to the freaking monday",
    "author" : "joy wraught",
    "id": uuidv4() 
},
{
    "message": "hello to the freaking tuesday",
    "author" : "samuel olalekan",
    "id": uuidv4()
}
]

let data1: any = []

const getAuthor = (req: any, res: any) => {
const output = data 
res.send(output)
}
const createAuthor = (req: any, res: any) => {
    const {message, author} = req.body

    data1.push({
        message: message,
        author: author,
        id : uuidv4()

        //the above code can also be written as such

        // message,
        // author,
        // id = "uuidv4"
    })

    res.json(data1)
}

const getIdAuthor = (req: any, res: any) => {
    const authorId = req.params.id// this is used to get the value of the parameter "id"    res.send("userid is " + userId)
    //   res.send("the id of the user is " + userId)
    
    const detail = data.find((value: any) => {
        return value.id.toString() === authorId
    })
        res.json(detail)
    }

const deleteAuthor = (req: any, res: any) => {
    const authorId = req.params.id

     data = data.filter((value: any) => {
        return (value.id !== authorId) 
        })
        res.json(data)
    }

const updateAuthor = (req: any, res: any) => {
    const authorId = req.params.id
    const {message, author} = req.body

    data = data.map((value: any) => {
        if (value.id === authorId) {
            return {
                message,
                author,
                id:value.id
            }
        }
        return value
    })
    res.json(data)
}


export {getAuthor, createAuthor, getIdAuthor, deleteAuthor, updateAuthor}

