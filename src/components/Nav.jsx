import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../index.css";
import { Context, SERVER } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Nav() {
  const {isAuthenticated,setIsAuthenticated,loader,setLoader}=useContext(Context)

  const logoutHandler=async ()=>{
    setLoader(true)
    try {
        const {data}=await axios.get(`${SERVER}/users/logout`,
        {
          withCredentials:true,
        }
      )
      setIsAuthenticated(false)
      toast.success(data.Message)
      setLoader(false)
    } catch (error) {
      setIsAuthenticated(true)
      toast.error("some error")
      setLoader(false)
    }
  }

  const [isButton,setButton]=React.useState(null)
  const handleButton=(Button)=>{
    setButton(Button)
  }

  return (
    <div className="bg-d text-black flex justify-between items-center w-full font-semibold uppercase px-8 md:px-20 p-2 border-lg fixed shadow-lg">
      <h2>Todo List</h2>
      <div className="w-[14rem] flex justify-between">
        <Link 
          to={"/"} 
          className={`button ${isButton==="home"?"bg-e border border-b":""} w-full p-2 px-4 text-center`} 
          onClick={()=>handleButton("home")}>Home
        </Link>
        <Link 
          to={"/profile"} 
          className={`button ${isButton==="profile"?"bg-e border border-b ":""} w-full p-2 px-4 text-center`} 
          onClick={()=>handleButton("profile")}>Profile
        </Link>

        {
          isAuthenticated?
          ( <Link 
              to={"/login"} 
              disabled={loader}
              className={`button ${isButton==="logout"?"bg-e border border-b":""} w-full p-2 px-4 text-center`} 
              onClick={()=>{logoutHandler();handleButton("logout")}}>Logout
          </Link>
          ):
          ( <Link 
              to={"/login"} 
              className={`button ${isButton==="login"?"bg-e border border-b":""} w-full p-2 px-4 text-center`} 
              onClick={()=>handleButton("login")}>Login
            </Link>
          )
        }
        
      </div>
    </div>
  )
}
