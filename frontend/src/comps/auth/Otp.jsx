import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import '../../styles/utilities.css';
import './Otp.css'
import { signupVerifyOtpApi, verifyOtpApi } from '../../api/api';
import { Usercontext } from '../../App';
import Spinner from '../Spinner';

export default function Otp() {
  const { onRequestOtp, setIsOtpVerified } = useContext(Usercontext)
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(60)
  const inputRef = useRef([])
  const timeRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    timeRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(timeRef.current);
          return 0
        }
        return prev - 1
      })
    }, 1000)
    // cleanup
    return () => clearInterval(timeRef.current);
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value

    // allow only single digit number
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value;
    // console.log("newotp ", newOtp)
    setOtp(newOtp)

    //move to next 
    if (value && index < 4) {
      inputRef.current[index + 1].focus()
    }
  }

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }


  const verifyOtp = async () => {
    try {
      const finalOtp = otp.join("")
      const purpose = location.state?.purpose
      const email = location.state?.email

      if (!purpose || !email) {
        alert('Invalid OTP session')
        return
      }

      let res;

      if (purpose === 'signup') {
        // Signup OTP verification route
        res = await signupVerifyOtpApi(email, finalOtp, purpose)
      }
      else if (purpose === 'reset-pass') {
        // Reset password OTP verification route
        res = await verifyOtpApi(email, finalOtp, purpose)
        // setIsOtpVerified(true)
      }

      if (!res) return

      alert(res.msg)

      if (purpose === 'signup') {
        navigate('/signin')
      }

      if (purpose === 'reset-pass') {
        navigate('/reset-password/new-password', { state: { email } })
      }

    } catch (error) {
      console.error('OTP verification failed', error.message)
    }
  }




  const resendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const purpose = location.state?.purpose
    const email = location.state?.email

    if (!purpose || !email) {
      alert('Invalid OTP session');
      setLoading(false);
      return;
    }
    let res;
    try {
      if (purpose === "signup") {
        // Send OTP for signup
        res = await onRequestOtp(email, purpose)
      } else if (purpose === "reset-pass") {
        // Send OTP for reset password
        res = await onRequestOtp(email, purpose)
      }

      if (!res) return
      alert(res.msg)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  if (loading) return <Spinner />

  return (
    <div className="otp-wrapper flex flex-col align-center">
      <div className="otp-container flex gap-md justify-center">
        {otp.map((box, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            ref={(el) => { inputRef.current[index] = el }}
            value={box}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          />
        ))}
      </div>
      <div className="flex gap-md">
        <Button type="button" onClick={verifyOtp} variant="auth">Verify</Button>
        <Button type="button" onClick={resendOtp} variant={time === 0 ? "auth" : "auth-disabled"} disabled={time > 0}>Resend</Button>

      </div> <br />
      {/* <p>Do not refresh the page</p> */}
      <p>{time}</p>
    </div>
  )
}
