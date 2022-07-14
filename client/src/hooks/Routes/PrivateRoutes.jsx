import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
  const {userAuth} = useSelector(state => state?.users);
  
  return (
    userAuth ? <Outlet /> : <Navigate to='/login' replace={true}/>
  )
}

export default PrivateRoutes