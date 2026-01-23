import React, { useContext, useState } from 'react'
import { requestOTP } from '../../api/api'
import Spinner from '../Spinner'
import { Usercontext } from '../../App'
import Button from '../buttons/Button'
import './authForm.css'
import { useNavigate } from 'react-router-dom'
export default function ResetPassword() {
  const { onRequestOtp, setIsOtpVerified } = useContext(Usercontext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const inputHandler = (e) => {
    setEmail(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let res = await onRequestOtp(email, 'reset-pass')
      if (!res) return
      setIsOtpVerified(true)
      alert(res.msg)
      navigate('/reset-password/verify-otp',
        {
          state: {
            email,
            purpose: 'reset-pass'
          }
        })
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <form onSubmit={submitHandler} className='auth-form flex flex-col gap-md'>
      <h1 className='auth-head'>Email for OTP verification</h1>
      <input
        type="email"
        placeholder='Email'
        name='email'
        onChange={inputHandler}
      />
      <div className="reset-password-cta">
        <Button type="submit" variant="auth">Submit</Button>
      </div>
    </form>
  )
}
