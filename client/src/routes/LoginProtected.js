import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/Login'

export const Protected = () => {
    const user = useSelector(state=> state.Auth.user)

  return user ? <Outlet/> : <Navigate to="/auth"/>
}


export const LoginProtected = () => {
    const user = useSelector(state=> state.Auth.user)

  return user ? <Navigate to="/"/> : <Login/>
}

