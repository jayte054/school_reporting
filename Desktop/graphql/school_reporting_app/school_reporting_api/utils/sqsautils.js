const {SQSClient, SendMessageCommand, ReceiveMessageCommand} = require("@aws-sdk/client-sqs");

// AWS.config.update({region: "us-east-1"})

const sqsClient = new SQSClient({region : process.env.AWS_config_region})

 const sendMessageToUserQueue = async(senderUserId, recipientUserId, messageBody) => {
    const recipientQueueUrl = `
    https://sqs.${process.env.AWS_config_region}.amazonawa.com/${process.env.AWS_config_accountId}/${recipientUserId}-queue
    `;
console.log(recipientQueueUrl)
    const params = {
        MessageBody: JSON.stringify({senderUserId, recipientUserId, messageBody}),
        QueueUrl: recipientQueueUrl
    }

    try{
        const data = await sqsClient.send( new SendMessageCommand(params))
        console.log(`Message sent to user ${recipientUserId}'s queue: ${data.MessageId}`);
        return {
            messageId: data.MessageId, 
            success: true
        }
    }catch(error){
        console.log("error",error)
        return{
            messageId: null,
            success: false
        }
    }
}

 const recieveMessageFromUserQueue = async (userId, maxMessages = 1) => {
    const queueUrl = `
    https://sqs.${process.env.AWS.config.region}.amazonawa.com/${process.env.AWS.config.accountId}/${userId}-queue
    `
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: maxMessages
    };

    try{
        const data = await sqsClient.send( new ReceiveMessageCommand(params)).promise()
        if(data.Messages){
            console.log(`Received ${data.Messages.length} messages from user ${userId}'s queue`)

            return data.Messages.map(message => ({
                messageId: message.MessageId,
                body: JSON.parse(message.body)
            }))
        }else {
            console.log(`No messages available in user ${userId}'s queue`)
            return [];
        }
            
    }catch(error){
        console.log(`Failed to retrieve message from user ${userId}'s queue`,error)
        throw new Error("failed to retrieve message from", userId)
    }
}

module.exports = {
    sendMessageToUserQueue,
    recieveMessageFromUserQueue
}