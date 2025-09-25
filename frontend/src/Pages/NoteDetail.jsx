import React, { useEffect, useState } from 'react'
import Nav from "../component/Nav"
import NoteCard from '../component/NoteCard'
import { useNavigate, useParams ,Link} from 'react-router'
import axios from 'axios'
import {LoaderIcon ,ArrowLeftIcon,Trash2Icon} from 'lucide-react'
import { toast } from 'react-hot-toast'

const NoteDetail = () => {
  const [note,setNote]=useState(null)
  const [loading,setLoading]=useState(true)
  const [saving,setSaving] =useState(false)
  const navigate = useNavigate()

  const {id} = useParams()
  
  useEffect(()=>{
    const fetchNote= async()=>{
      try{
        const res =await axios.get(`http://localhost:3002/api/notes/${id}`)
        setNote(res.data)
      }catch(err){
        console.log("Error occured",err)
        toast.error("Faild to fetch note")
      }finally{
        setLoading(false)
      }
    }
    fetchNote()

  },[id])

  const handleDelete=async()=>{
    if(!window.confirm("Are you sure, you want to delete this note?")) return;

    try{
      await axios.delete(`http://localhost:3002/api/notes/${id}`)
      toast.success("Note deleted Successfully")
    }catch(err){
      console.log("Error occured",err)
      toast.error("Faild to delete note")
    }finally{
      navigate("/")
    }

  }

  const handleSave= async()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Title and content are required")
      return;
    }
    setSaving(true)
    try{
      await axios.put(`http://localhost:3002/api/notes/${id}`,note)
      toast.success("Note updated successfully")  
      navigate("/")
    }catch(err){
      console.log("Error occured",err)
      toast.error("Faild to update note")
    }finally{
      setSaving(false)
    }
  }


  if (loading){
    return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='size-10 animate-spin'/>
    </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to='/'className='btn btn-ghost'>
          <ArrowLeftIcon className='size-5'/> Back to Home
          </Link>
          <button className='btn btn-outline btn-error' onClick={handleDelete}>
            <Trash2Icon className='size-5'/>Delete Note
          </button>
        </div>
        <div className='card bg-base-100'>
          <div className='card-body '>
            <div className="form-control mb-4">
              <label className='label'>
                <span className="labeltext">Title</span>
              </label>
              <input type="text"
              placeholder='Enter title'
              value={note.title}
              className='input input-bordered'
              onChange={(e)=>setNote({...note,title:e.target.value})}
              />
              <label className='label'>
                <span className="labeltext">Your Note</span>
              </label>
              <textarea
              placeholder='Enter your note'
              value={note.content}
              className='input input-bordered h-32'
              onChange={(e)=>setNote({...note,content:e.target.value})}
              />
            </div>

            <div className='card-actions justify-end'>
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? "saving...":"Save Changes"}
              </button>
            </div>
          </div>

        </div>
        </div>
      </div>

    </div>
  );
}

export default NoteDetail
