import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Usercontext } from '../../App'
import { signIn } from '../../api/api'
import './authForm.css'
import Button from '../buttons/Button'
import Spinner from '../Spinner'

export default function Signin() {

  const { loading, setLoading, loadUser } = useContext(Usercontext)
  let navigate = useNavigate()
  const [logInput, setlogInput] = useState({
    email: "",
    password: ""
  })

  if (loading) {
    return <Spinner />
  }

  const inputHandler = (e) => {
    setlogInput({ ...logInput, [e.target.name]: e.target.value })
  }

  const signinHandler = async (e) => {
    e.preventDefault()
    //console.log("User login input", logInput)
    try {
      let data = await signIn(logInput)
      if (!data) {
        setLoading(false)
        return
      }
      localStorage.setItem("logToken", data.token)
      alert(data.msg)//alert success msg
      await loadUser();
      navigate('/')


    } catch (error) {
      console.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="info-message" style={{
        backgroundColor: '#fff3cd',
        color: '#856404',
        padding: '10px 15px',
        border: '1px solid #ffeeba',
        textAlign: 'center'
      }}>
        Signin may take time because data comes from render and it takes a while.
      </div>
      <form className='auth-form flex flex-col gap-md box-grey-shadow' onSubmit={signinHandler} >
        <h1 className='auth-head'>Login Your Account!</h1>
        <input
          type="text"
          placeholder='Email'
          name='email'
          value={logInput.email}
          onChange={inputHandler}
        />
        <input
          type="password"
          placeholder='Password'
          name='password'
          value={logInput.password}
          onChange={inputHandler}
        />
        {/* <Link style={{ color: "#4169E1", textDecoration: 'none' }} to={'/reset-password'}>Forget password</Link> */}
        <div className="auth-form-cta">
          <Button variant="signin" type="submit">Login</Button>
        </div>
      </form>
    </>
  )
}
