import mongoose from "mongoose"

// 1. Creating a schema
// 2. Model based on the schema
const noteschema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},
{timestamps:true}//createdAt, updatedAt
);

const Note = mongoose.model("Note", noteschema)

export default Note;
