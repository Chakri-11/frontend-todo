import React from 'react'
import { Context } from '../main'
import { useContext } from 'react'
import Loader from '../components/Loader'

const Profile = () => {
  const {loader,user}=useContext(Context)
  console.log(user)
  return (
    <div className='p-20 '>
    <h1>{user?.name}</h1>
    <p>{user?.email}</p>
    </div>
  )
}

export default Profile
