import jwt from 'jsonwebtoken'
import User from '../models/usermodel.js'

const protectRoute =async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(501).json({err:"unauthorized access"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SEC)

        if(!decoded){
            return res.status(501).json({err:"invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(500).json({err:"no user Found"})
        }

        req.user = user

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server Error"})
    }
}

export default protectRoute