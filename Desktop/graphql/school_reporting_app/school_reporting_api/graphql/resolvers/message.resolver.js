const { sendMessageToUserQueue, recieveMessageFromUserQueue } = require("../../utils/sqsautils")
const {sendWebSocketMessage, pubSub} = require("../../utils/websocket")
const User = require("../../models/user.model")

const messageResolver = {
    sendMessageToUser: async (SendMessageInput, context) => {
        const {senderUserId, recipientUserId, messageBody} = SendMessageInput.SendMessageInput
        console.log(SendMessageInput)
        console.log(senderUserId)
        
        if(context.isAuth === undefined) {
            throw new Error(" user not authenticated")
        }
        console.log("context", context.userId)
        console.log(senderUserId)

        if(context.userId !== senderUserId) {
            throw new Error("user is not authorized to send messages on behalf of another user")
        }

        try{
            const sender = await User.findById(senderUserId)
            const recipient = await User.findById(recipientUserId)

            if(!sender || !recipient) {
                throw new Error(" sender or recipient user not found")
            }
            const {messageId, success} = await sendMessageToUserQueue(senderUserId, recipientUserId, messageBody)

            if(success) {
                const message = `New message from ${senderUserId}: ${messageBody}`;
                sendWebSocketMessage(recipientUserId, message)
                pubSub.publish(`MESSAGE_RECEIVED_${recipientUserId}`, {
                    messageRecieved: {
                        messageId, 
                        body: messageBody
                    }
                })
            }

            return {messageId, success};
        }catch(error){
            console.log("failed to send message", error)
            throw new Error("failed to send message")
        }
    },

    subscription: {
        messageRecieved: {
            subscribe: (_, {userId}) => {
                const channel = `MESSAGE_RECIEVED_${userId}`;
                return pubSub.asyncIterator(channel)
            }
        }
    },

    recieveMessageFromUser: async(_, {userId, maxMessages}, context) => {
        if(!context.isAuth){
            throw new Error("user is not authenticated")
        }

        if(context.userId !== userId) {
            throw new Error("User is not authorized to recieve messages of another user ")
        }

        try{
            const user = await User.findById(userId)

            if(!user){
                throw new Error("user not found")
            }

            const messages = await recieveMessageFromUserQueue(userId, maxMessages)
            return messages.map(message => ({
                messageId: message.MessageId,
                body: message.body
            }))
        }catch(error){
            console.log(error)
            
            return ("failed to recieve messages",[])
        }
    }
}

module.exports = messageResolver