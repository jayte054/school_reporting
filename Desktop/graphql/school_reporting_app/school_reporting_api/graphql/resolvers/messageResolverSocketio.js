const User = require("../../models/user.model")
const Message = require("../../models/message.model");
const { SendWebSocketMessage, pubSub, joinUserRoom } = require("../../utils/websocketio");
// const {io} = require("../../app")


const messageResolverSocketIo = {
    SendMessageToUser: async( SendMessageInput, context) => {
        const {senderUserId, recipientUserId, messageBody} = SendMessageInput.SendMessageInput
        if(!context.isAuth){
            throw new Error("user is not authenticated")
        }
        if(context.userId !== senderUserId){
            throw new Error("User is not authorized to send messages on behalf of another user");
        }

        try{
            const sender = await User.findById(senderUserId);
            const recipient = await User.findById(recipientUserId);

            if(!sender || !recipient) {
                throw new Error("sender or recipient not found")
            }

            const message = new Message({
                senderUserId,
                recipientUserId,
                messageBody
            });

            await message.save();

            SendWebSocketMessage(recipientUserId, message)

            const channel = `MESSAGE_RECEIVED_${recipientUserId}`;
            pubSub.publish(channel, {messageRecieved: message.messageBody})

            return {
                messageId: message._id,
                success: true
            }
        }catch(error){
            console.log(error)
            throw new Error("failed to send message")
        }
    },

    subscription: {
        messageRecieved: {
            subscribe: (_, {userId}) => {
                const channel = `MESSAGE_RECEIVED_${userId}`
                pubSub.publish(channel, {messageRecieved: message.messageBody})

            }
        }
    },

    ReceiveMessageFromUser: async( RecieveMessageInput, context) => {
        console.log("jjj", RecieveMessageInput)
        const {userId, maxMessages} = RecieveMessageInput.RecieveMessageInput
        console.log(context.isAuth)
        console.log(userId)
        if(!context.isAuth) {
            throw new Error("User is not authenticated")
        }

        if(context.userId !== userId) {
            throw new Error("User is not authorized to receive messages of another user")
        }

        try{
            const user = await User.findById(userId);

            if(!user){
                throw new Error(" user not found")
            }

            const messages = await Message.find({recipientUserId: userId})
                            .sort({createdAt: -1})
                            .limit(maxMessages)

            return messages.map(message => ({
                messageId: message._id,
                body: message.messageBody
            }))
        }catch(error){
            console.log(error)
            throw new Error("failed to retrieve message")
        }
    }
}

// io.on("connection", (socket) => {
//     socket.on("joinRoom", (userId) => {
//         joinUserRoom(socket, userId)
//     })
// });

module.exports = messageResolverSocketIo