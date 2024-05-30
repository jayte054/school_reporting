const express = require("express")
const bodyParser = require("body-parser")
const graphqlPlayground = require("graphql-playground-middleware-express").default
const { graphqlHTTP } = require("express-graphql")
const dotenv = require("dotenv")
const database = require("./database")
const graphqlSchema = require("./graphql/schemas/index")
const graphqlResolver = require("./graphql/resolvers/auth.resolvers")

dotenv.config();
// console.log(process.env.SECRET_KEY)

const app = express()
app.use(bodyParser.json());
app.get("/playground", graphqlPlayground({endpoint: "/graphql"}))
app.use((req, res, next) => {
    if (req.method ==="OPTIONS") {
        return res.sendStatus(200)
    }
    next()
})

app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // graphiql: true
}))

if(database) {
    console.log("database connection successful")
}

const port = 4222;
app.listen(port, console.log(`app is running on port ${port}`))