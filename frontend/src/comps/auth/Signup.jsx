import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../api/api'
import Button from '../buttons/Button'
import '../../styles/utilities.css'
import './authForm.css'
import Spinner from '../Spinner'
import { Usercontext } from '../../App'
export default function Signup() {
  const { setIsOtpVerified } = useContext(Usercontext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const signupHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await signUp(formData)
      if (!res) return
      //console.log("res ", res)

      // navigate('/signup-verify', {
      //   state: {
      //     email: res.email,
      //     purpose: 'signup'
      //   }
      // })

      // setIsOtpVerified(true)
      setFormData({ username: "", email: "", password: "" })
      alert(res.msg)
      navigate('/signin')

    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  if (loading) return <Spinner />



  return (
    <form className='auth-form flex flex-col gap-md box-grey-shadow' onSubmit={signupHandler} >
      <h1 className='auth-head'>Create Your Account!</h1>

      <input type="text"
        name='username'
        value={formData.username}
        onChange={inputHandler}
        placeholder='Username' />

      <input type="email"
        name='email'
        value={formData.email}
        onChange={inputHandler}
        placeholder='Enter email' />

      <input type="password"
        name='password'
        value={formData.password}
        onChange={inputHandler}
        placeholder='Enter Password' />
      <Link style={{ color: "#4169E1", textDecoration: 'none' }} to={'/signin'}>Already have an account</Link>

      <div className="auth-form-cta">
        <Button variant="signup" type="submit">Signup</Button>
      </div>
    </form>
  )
}
