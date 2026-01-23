import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../App'
import { Navigate } from 'react-router-dom'
import Spinner from '../comps/Spinner'

export default function Auth({ children }) {
  const { user, loading } = useContext(Usercontext)
  // const token = localStorage.getItem('logToken')
  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return <Navigate to="/signin" />
  }
  return (
    <>
      {children}
    </>
  )
}
