const WebSocket = require("ws");
const {PubSub} = require("graphql-subscriptions")

const pubSub = new PubSub();
const wsServer = new WebSocket.Server({noServer: true})


 const setupWebSocketServer = (server) => {
   server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request)
    })
   })

   wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`)
    })
   })
}

 const sendWebSocketMessage = (userId, message) => {
    const channel = `MESSAGE_RECIEVED_${userId}`;
    pubSub.publish(channel, {messageReceived: message})
}

module.exports = {
    sendWebSocketMessage,
    setupWebSocketServer,
    pubSub
}