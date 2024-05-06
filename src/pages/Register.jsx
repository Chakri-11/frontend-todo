import React, { useContext } from 'react'
import backgroundImage from "../assets/todoLogin.jpg"
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { SERVER } from '../main'
import toast from "react-hot-toast"
import { Context } from '../main'

const Register = () => {
  const [name,setName]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  
  const {isAuthenticated,setIsAuthenticated,loader,setLoader}=useContext(Context)

  const submitHandler= async (e)=>{
    try {
      e.preventDefault();
      setLoader(true)
      const {data}=await axios.post(`${SERVER}/users/register`,
        { name,
          email,
          password
        },
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true,
        }
      )
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoader(false)

    } catch (error) {
      toast.error(error.response.data.Message)
      setIsAuthenticated(false)
      setLoader(false)
    }
  }

  if(isAuthenticated) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="flex flex-col justify-center p-10 shadow-lg w-[22rem] md:w-[30rem] w-max-full max-w-md h-[32rem]">
        <h2 className="text-2xl font-semibold pb-8 text-center">Sign Up</h2>
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label for="name" className="block text-md font-medium mb-2">Username</label>
                <input 
                  type="text" 
                  name="name" 
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder="Enter your username" 
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                />
            </div>
            <div className="mb-4">
                <label for="email" className="block text-md font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                />
            </div>
            <div className="mb-4">
                <label for="password" className="block text-md font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                />
            </div>
            <div className="flex justify-center mb-2">
                <button 
                  type="submit" 
                  disabled={loader}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline px-10">Sign Up</button>
            </div>
            <h5 className="text-center text-lg font-medium">Or</h5>
            <p className="text-blue-600 text-center underline text-md font-medium"><Link to={"/login"}>Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register
