const { Server } = require("socket.io")
const {PubSub} = require("graphql-subscriptions")

const pubSub = new PubSub()
let io;

const SetupWebSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("joinRoom", (userId) => {
            joinUserRoom(socket, userId)
        })
        
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`)
        })
    })

    return io
}

const SendWebSocketMessage = (userId, message) => {
    if(io) {
        io.to(userId).emit("messageReceived", message)
    }
}

const joinUserRoom = (socket, userId) => {
    socket.join(userId)
}

module.exports = {
    SetupWebSocketServer,
    SendWebSocketMessage,
    joinUserRoom,
    pubSub
}