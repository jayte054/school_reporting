const express = require("express")
const bodyParser = require("body-parser")
const graphqlPlayground = require("graphql-playground-middleware-express").default
const { graphqlHTTP } = require("express-graphql")
const http = require("http")
const dotenv = require("dotenv")
const database = require("./database")
const graphqlSchema = require("./graphql/schemas/index")
const rootResolver = require("./graphql/resolvers/index")
const SchoolReportsSchema = require("./graphql/schemas/index")
const isAuth = require("./middlewares/is-auth")
const contextHelper = require("./helpers/contexthelper")
const { setupWebSocketServer } = require("./utils/websocket")
const {SetupWebSocketServer} = require("./utils/websocketio")


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

app.use(isAuth)

// app.use("/graphql", graphqlHTTP({
//     schema: SchoolReportsSchema,
//     rootValue: rootResolver,
//     // graphiql: true
// }))

app.use('/graphql', graphqlHTTP((req) => ({
    schema: SchoolReportsSchema,
    rootValue: rootResolver,
    context: contextHelper(req)
})));

if(database) {
    console.log("database connection successful")
}


const port = 4222;
const server = http.createServer(app);

//using sqs
setupWebSocketServer(server);

//using socket.io
const io = SetupWebSocketServer(server)

server.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

module.exports = {io};
