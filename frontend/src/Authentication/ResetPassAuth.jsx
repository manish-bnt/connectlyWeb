import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Usercontext } from '../App'

export default function ResetPassAuth({ children }) {
  const { isOtpVerified } = useContext(Usercontext)

  if (!isOtpVerified) {
    return <Navigate to="/signup" replace />
  }

  return (
    <>
      {children}
    </>
  )
}
