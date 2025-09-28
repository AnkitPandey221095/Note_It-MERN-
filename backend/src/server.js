// importing necessary modules
import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

// importing routes and database connection
import notesRoute from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"

// initializing express app
dotenv.config()

const app = express()
const __dirname = path.resolve()

//middleware
if(process.env.NODE_ENV !== "production"){
app.use(cors({origin:"http://localhost:5173"}))
}
app.use(express.json())

//routes
app.use("/api/notes", notesRoute)
app.use(express.static(path.join(__dirname, "../frontend/dist")))

if(process.env.NODE_ENV === 'production'){

    app.get('/*',(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })
}

//connecting to database and starting the server
connectDB().then(()=>{
app.listen(3002, ()=>{
    console.log('Server is running on port http://localhost:3002/api/notes')
})
})