import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'

export const SERVER="https://todolist-s04q.onrender.com/api/v1"
export const Context=createContext({isAuthenticated:false})

const Wrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=React.useState(false)
  const [loader,setLoader]=React.useState(false)
  const [user,setUser]=React.useState("")

  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,loader,setLoader,user,setUser}}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
)
