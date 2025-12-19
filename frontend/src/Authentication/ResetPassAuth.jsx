import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Usercontext } from '../App'

export default function ResetPassAuth({ children }) {
  const { otpId } = useContext(Usercontext)

  // if (!otpId) {
  //   return <Navigate to="/reset-password" replace />
  // }

  return (
    <>
      {children}
    </>
  )
}
