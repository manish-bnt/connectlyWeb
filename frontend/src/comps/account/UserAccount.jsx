import React, { useState } from 'react'
import '../../styles/utilities.css'
import './UserAccount.css'
import Profiledp from '../profile/Profiledp'
import Button from '../buttons/Button'
import { deleteAccount } from '../../api/api'
import { useNavigate } from 'react-router-dom'
export default function UserAccount() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const inputHandler = (e) => {
    setEmail(e.target.value)
  }

  const deleteHandler = async (e) => {
    e.preventDefault()
    console.log("del ", email)
    setEmail("")
    if (!email.trim()) {
      alert("Please enter your email")
      return
    }
    let token = localStorage.getItem('logToken')
    let data = await deleteAccount(token, email)
    if (!data) return null
    localStorage.removeItem('logToken')
    alert(data.msg)
    navigate('/signup')
  }

  return (
    <div className="user-account-container flex gap-md">


      {/* Right side  */}

      <div className="account-right flex justify-center align-center">
        <div className="account-user-card flex flex-col justify-center gap-md box-grey-shadow">
          <h2 className='account-right-head'>Delete this account</h2>
          <div className="profile-image">
            <Profiledp />
          </div>
          <p>To delete your account, confirm your email address</p>
          <div className="account-cta flex flex-col align-start gap-md">
            <input className='email-input' onChange={inputHandler} name='email' value={email} placeholder='example@gmail.com' type="email" />
            <Button onClick={deleteHandler} type="button" variant="delete">Delete account</Button>
          </div>
        </div>
      </div>


      {/* Left side  */}
      <div className="account-left flex flex-col justify-center align-center bg-success-color">
        <i className="fa-solid fa-gear setting-icon pointer"></i>
        <h2 className="account-left-head">Setting</h2>
      </div>



    </div>
  )
}
