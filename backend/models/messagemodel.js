import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({

    senderId:{
        type:String,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:String,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required: true
    }
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message;