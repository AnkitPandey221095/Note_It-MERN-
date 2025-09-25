// importing necessary modules
import express from 'express'
import cors from 'cors'

// importing routes and database connection
import notesRoute from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"

// initializing express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use("/api/notes", notesRoute)

//connecting to database and starting the server
connectDB().then(()=>{
app.listen(3002, ()=>{
    console.log('Server is running on port http://localhost:3002/api/notes')
})
})