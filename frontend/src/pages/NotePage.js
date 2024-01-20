

import { useState,useEffect } from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import { logout } from '../actions/authActions'
const NotePage = () => {
  const {id}= useParams()
  const navigate=useNavigate()
  

    let [note,setNote]= useState(null);

    useEffect(()=>{
   getNote();
    },[id])

    let getNote=async ( )=>{
        const response = await fetch(`/api/notes/${id}`)
        const data= await response.json();

        setNote(data)
    }

    let updateNote=async()=>{
     fetch(`/api/notes/${id}/update/`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(note)
     })

    }

    let createNote =()=>{
      fetch("/api/notes/create/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(note)
      })
    }
    let handleSubmit=()=>{
      if( id !== "new" && !note.body){
        handleDelete()
      } 
      else if( id !== "new"){

        updateNote();
      }
      else if( id === "new" && note !==null ){
        createNote()
      }
  navigate("/");

    }
    let handleDelete=()=>{
    fetch( `/api/notes/${id}/delete/`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    navigate("/")
    }
   
  return (
    
    <div className='note'>
      <button onClick={logout}>logout</button>
      <h3 className='note-header' onClick={handleSubmit}>Back</h3>
     {id !== "new" ?(<button onClick={handleDelete}>Delete</button>):
                    (<button onClick={handleSubmit}>Done</button>)}

      <textarea defaultValue={note?.body} onChange={(e)=>{setNote({...note,'body':e.target.value})}}/>
    </div>
  )
}

export default NotePage
