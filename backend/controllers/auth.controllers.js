import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/jwt.js";

export const signup = async(req,res)=>{
    try {
        const {fullname,username,password,confirmpassword,gender} = req.body;

        if(password !== confirmpassword){
            return res.status(400).json({error: 'password dont match'})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error: ' user already exist'})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashed = await bcryptjs.hash(password,salt)

        const boyPic = `https://avatar.iran.liara.run/public/boy?${username}`
        const girlPic  = `https://avatar.iran.liara.run/public/girl?${username}`

        const newuser = new User({
            fullname,
            username,
            password:hashed,
            gender,
            profilePic: gender === 'male'? boyPic : girlPic
        })

       if(newuser){
        generateTokenAndSetCookie(newuser._id , res)
        await newuser.save()
        

        return res.status(200).json({
            _id:newuser._id,
            fullname: newuser.fullname,
            username : newuser.username,
            profilePic: newuser.profilePic
        })
       }

    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
}

export const login = async (req,res)=>{
    try {
        const {username , password} = req.body
        const user = await User.findOne({username})

        const isCorrect = await bcryptjs.compare(password,user?.password || "")

        if(!user || !isCorrect){
           return res.status(400).json({message: 'somethings wrong'})
        }
        generateTokenAndSetCookie(user._id , res)
                
        return res.status(200).json({
            _id:user._id,
            fullname: user.fullname,
            username : user.username,
            profilePic: user.profilePic
            })
        }
    catch (error) {
        res.status(500).json({error})
        console.log(error)   
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logout success"})
        
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
}