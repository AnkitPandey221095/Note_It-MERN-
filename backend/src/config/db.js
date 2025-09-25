import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


export const connectDB = async ()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")
    }
    catch(err){
        console.error("Database connection error:",err)
        process.exit(1)// exit process with failure
    }
}