import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Usercontext } from '../../App'
import Button from '../buttons/Button'
import { addContact } from '../../api/api'
import './AddContact.css'
import '../../styles/utilities.css'

export default function AddContact() {
  const { loadUser } = useContext(Usercontext)
  const navigate = useNavigate()
  const [addForm, setAddForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  })

  const token = localStorage.getItem('logToken')
  const formHandler = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    if (!addForm.name || !addForm.mobile) {
      alert("Fields are required!")
      return
    }
    // for (let key in addForm) {
    //   if (addForm[key] === "") {
    //     alert("Input cannot be empty. Please enter a value!")
    //     return
    //   }
    // }
    setAddForm({ name: "", mobile: "", email: "", address: "" })
    let data = await addContact(addForm, token)
    if (!data) return
    alert(data.msg)
    navigate('/')
    await loadUser()
    // console.log("backend response ", data)

  }

  return (

    <div className="add-contact-container flex gap-md">

      {/* Right-part  */}
      <div className="right-contact-part flex justify-center align-center">
        <form className='add-contact-form flex flex-col gap-md box-grey-shadow' onSubmit={submitHandler}>
          <h1 className='contact-form-head'>Add Contact</h1>
          <input
            type="text"
            placeholder='name'
            name='name'
            value={addForm.name}
            onChange={formHandler}
          />

          <input
            type="number"
            placeholder='mobile'
            name='mobile'
            value={addForm.mobile}
            onChange={formHandler}
          />

          <input
            type="email"
            placeholder='email (Optional)'
            name='email'
            value={addForm.email}
            onChange={formHandler}
          />

          <input
            type="text"
            placeholder='address (Optional)'
            name='address'
            value={addForm.address}
            onChange={formHandler}
          />

          <div className="add-contact-cta flex gap-md">
            <Button type="submit" variant="save">Submit</Button>
            <Button onClick={() => navigate(-1)} type="button" variant="cancel">Cancel</Button>
          </div>
        </form>
      </div>

      {/* Left-part  */}
      <div className="left-contact-part bg-success-color flex flex-col justify-center align-center gap-md">
        <i className="fa-solid fa-user-plus add-contact-icon"></i>
        <h2 className='add-contact-head'>Add Contact</h2>
      </div>

    </div>
  )
}
