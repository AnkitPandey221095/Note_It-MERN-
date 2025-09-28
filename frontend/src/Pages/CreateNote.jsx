import { useState } from "react"
import {Link, useNavigate} from 'react-router'
import {ArrowLeftIcon} from 'lucide-react'
import {toast} from "react-hot-toast"
import axios from "axios"
import api from "../lib/axios"

const CreateNote = () => {
  const [title,setTitle]=useState("")
  const [content, setContent]=useState("")
  const [loading,setLoading] = useState(false)
  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error("Please fill all the fields")
    }
    setLoading(true)
    try{
      await api.post("/notes",{title,content})
      toast.success("Note created successfull!")
      navigate("/")
    }catch(err){
      console.log("Error in creating note",err)
      toast.error("Note Creation Unsuccessful")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
           <Link to={"/"} className="">
           <ArrowLeftIcon className="size-4"/> Back to Home
           </Link>
           <div className="card bg-base-100">
            <div className="card-body">
              <h1 className="Card-title text-2xl mb-4">Create New Note</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" 
                  placeholder="Enter title of note"
                  className="input input-bordered"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}/>

                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                  placeholder="Enter the tasks"
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary" disabled={loading}>{loading? "Creating...":"Create Note"}</button>
                </div>
              </form>
            </div>

           </div>
        </div>

      </div>
    </div>
  )
}

export default CreateNote
