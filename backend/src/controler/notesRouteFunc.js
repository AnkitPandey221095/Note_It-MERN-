import Note from "../models/Note.js"

export async function getreq(req,res){
    try{
        const note = await Note.find().sort({createdAt:-1})
        res.status(200).json(note)
    }
    catch(err){
        console.error("Error in getreq method:", err)
        res.status(500).json({message:"Internal Server Error"})
    }
   
}

export async function getidreq(req,res){
    try{
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note)
    }
    catch(err){
        console.error("Error in getreq method:", err)
        res.status(500).json({message:"Internal Server Error"})
    }
   
}

export function postreq(req,res){
    try{
        const {title,content}= req.body
        const newNote = new Note({title,content})
        newNote.save()
        res.status(201).json({message:"Note created successfully"})
    }
    catch(err){
        console.error("Error in postreq method:", err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function putreq(req,res){
    try{
        const {title,content} = req.body
        const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updatedNote)

    }catch(err){
        console.error("Error in put request",err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deletreq(req,res){
try{
    const deletedNote=await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Note deleted successfully"})
}
catch(err){
    console.error("Error in delete request",err)
    res.status(500).json({message:"Internal Server Error"})
}
}



//mongodb+srv://ankitpandey221020:lddO4Vq2IK8qnDdO@cluster0.5vkomso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0