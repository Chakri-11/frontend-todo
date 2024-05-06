import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { Context, SERVER } from './main'
import axios from "axios"

const App = () => {
  const {setUser,setIsAuthenticated,setLoader}=useContext(Context)
  useEffect(()=>{
    setLoader(true)
    axios
      .get(`${SERVER}/users/me`,{
        withCredentials:true,
      })
      .then((res)=>{
        setUser(res.data.User)
        setIsAuthenticated(true)
        setLoader(false)
      })
      .catch((error)=>{
        setUser({})
        setIsAuthenticated(false)
        setLoader(false)
      })
  },[]);

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
      <Toaster ClassName="mt-44"/>
    </Router>
  )
}

export default App

