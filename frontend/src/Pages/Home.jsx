import React from 'react'
import Nav from "../component/Nav"
import axios from 'axios'
import {useState, useEffect} from 'react'
import NoteCard from '../component/NoteCard'


const Home = () => {
  const [notes, setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  

  useEffect(()=>{
    const fetchFuction = async ()=>{
      try{
        const res = await axios.get("http://localhost:3002/api/notes")
        setNotes(res.data)
        setLoading(false)
      }catch(err){
        console.log("Error fetching notes", err)
      }
    }

    fetchFuction()
  },[])

  return (
    <div>
      <Nav/>
      <div className="max-w-7xl mx-auto mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading page ....</div>}
        {!loading && notes.length===0 && <div className='text-center text-primary py-10'>No notes found, Create your first note</div>}
        {
          notes.length>0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note)=>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home
