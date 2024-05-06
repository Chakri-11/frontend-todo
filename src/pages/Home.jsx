import React, { useEffect } from 'react'
import backgroundImage from "../assets/todoLogin.jpg"
import axios from "axios"
import {SERVER} from "../main"
import toast from 'react-hot-toast'
import Todoitem from '../components/Todoitem'

const Home = () => {

  const [title,setTitle]=React.useState("")
  const [description,setDescription]=React.useState("")
  const [loader,setLoader]=React.useState(false)
  const [task,setTask]=React.useState([])
  

  const submitHandler=async (e)=>{
    e.preventDefault()
    setLoader(true)
    try {
        const {data}=await axios.post(`${SERVER}/Task/new`,{
          title,
          description,
        },
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true,
        }
      )
      setTitle("")
      setDescription("")
      toast.success(data.Message)
      setLoader(false)
    } catch (error) {
      toast.error(error.response.data.Message)
      setLoader(false)
    }
  }

  useEffect(()=>{
    axios
      .get(`${SERVER}/Task/my`,{
        withCredentials:true,
      })
      .then((res)=>{
        setTask(res.data.Task)
      })
      .catch((error)=>{
        toast.error(error.response.data.Message)
      })
  },[])

  return (
    <div className="absolute inset-0 z-0 h-screen bg-cover bg-center " style={{backgroundImage: `url(${backgroundImage})`,filter:'blur(px)',zIndex: -1}}>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-1/2 border-r border-gray-300 px-4 sm:px-8 md:px-2 lg:px-5">
          <div className='flex justify-center'>
            <div className="flex flex-col justify-center py-2 px-4 md:p-10 bg-white/60 backdrop-blur shadow-lg w-full md:h-[43.25rem] mt-16 md:mt-0">
              <h2 className="text-2xl font-semibold pb-2 md:pb-4 text-center">TODO LIST</h2>
              <form onSubmit={submitHandler}> 
                  <div className="mb-2 md:mb-4">
                      <label className="block text-md font-medium mb-2">Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Enter title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                      />
                  </div>
                  <div className="md:mb-4">
                      <label className="block text-md font-medium mb-2">Description</label>
                      <input 
                        type="text" 
                        name="description" 
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-[6rem] md:h-[12rem] lg:h-[16rem]" 
                        placeholder="Enter your task" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                      />
                  </div>
                  <div className="flex justify-center mb-2">
                      <button 
                        type="submit" 
                        disabled={loader}
                        className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline px-10">{loader ? 'Adding Task...' : 'Add Task'}
                      </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 overflow-auto">
          <div className="h-80 overflow-auto py-2 px-4 md:p-10">
            <div className="border rounded w-full h-[2.5rem] py-2 px-3 bg- text-gray-700 md:mt-16">
              {task?.map((i)=>(
                <div key={i._id}>{i.title}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

