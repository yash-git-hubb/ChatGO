import Conversation from "../models/conversationmodel.js"
import Message from "../models/messagemodel.js"

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body
        const senderId = req.user._id
        const {id:receiverId} = req.params

        let conversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}})
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
           await conversation.messages.push(newMessage._id)
        }

        await conversation.save();
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error, 'error in sending message')
        res.status(500).json({error:"internal error"})
    }
}