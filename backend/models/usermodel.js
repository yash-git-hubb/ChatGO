import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    username:{
        type:String,
        default:''
    },
    profilePic:{
        type:String,
        default:'https://avatar.iran.liara.run/public/boy?username=matt'
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User