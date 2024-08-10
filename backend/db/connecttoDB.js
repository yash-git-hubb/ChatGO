import mongoose from 'mongoose'

const connectToMongo = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (error) {
        console.log("err : " , error)
    }
}

export default connectToMongo;