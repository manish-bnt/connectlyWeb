import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { Usercontext } from '../../App'
import './authForm.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../buttons/Button'
import { newPassword } from '../../api/api'

export default function NewPassword() {
  // const { otpId } = useContext(Usercontext)
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email
  const [errorMsg, setErrorMsg] = useState("")
  const inputRef = useRef()
  const [newPass, setNewPass] = useState({
    password: "",
    confirmPassword: ""
  })


  const inputHandler = (e) => {
    setNewPass({ ...newPass, [e.target.name]: e.target.value })
  }



  const saveHandler = async (e) => {
    e.preventDefault()

    if (newPass.password !== newPass.confirmPassword) {
      inputRef.current.style.border = "1px solid red"
      return setErrorMsg("Password missmatch")
    }
    let data = await newPassword(newPass.confirmPassword, email)
    alert(data.msg)
    if (!data) return
    navigate('/signin')
  }

  return (
    <form onSubmit={saveHandler} className='auth-form flex flex-col gap-md box-grey-shadow'>

      <h1 className='auth-head'>Create new password</h1>

      <input type="password"
        ref={inputRef}
        name='password'
        value={newPass.password}
        onChange={inputHandler}
        placeholder='Create New Password' />

      <input type="password"
        ref={inputRef}
        name='confirmPassword'
        value={newPass.confirmPassword}
        onChange={inputHandler}
        placeholder='Confirm New Password' />

      <div className="new-password-cta">
        <Button type="submit" variant="auth">Save</Button>
      </div>

      <p style={{ color: "red" }}>{errorMsg}</p>

    </form>
  )
}
