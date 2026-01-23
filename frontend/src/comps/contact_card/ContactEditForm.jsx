import React, { useContext, useState } from 'react'
import { Usercontext } from '../../App'
import { updateContact } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import './ContactEditForm.css'
import Button from '../buttons/Button'
import '../../styles/utilities.css'
import ContactCardProfile from './ContactCardProfile'
import { toProperCase } from '../../utility/utility'

export default function ContactEditForm({ index }) {
  const { user, loadUser } = useContext(Usercontext)
  console.log("user ", user)
  const [editForm, setEditForm] = useState(user)
  const navigate = useNavigate()

  const inputHandler = (e) => {
    const updateContacts = [...editForm.contacts]
    updateContacts[index] = {
      ...updateContacts[index],
      [e.target.name]: e.target.value
    }
    console.log(updateContacts)
    setEditForm({ ...editForm, contacts: updateContacts })
  }

  const saveHandler = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('logToken')
    let data = await updateContact(token, editForm.contacts[index], index)
    if (!data) return
    alert(data.msg)
    await loadUser()
    navigate(-1)
    // console.log("save handler ", editForm)
  }

  return (
    <>
      <div className="editContact-wrapper flex gap-md">
        {/* Left-section */}
        <div className="editContact-user-left flex justify-center align-center">
          <form onSubmit={saveHandler} className='edit-contact-form flex flex-col gap-md box-grey-shadow'>
            <div className="edit-contact-form-header">
              {/* <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left pointer"></i> */}
              <h1 className='edit-contact-head'>Edit Contact</h1>
            </div>

            <input type="text"
              name='name'
              value={
                editForm.contacts[index].name
              }
              onChange={inputHandler}
            />
            <input type="number"
              onChange={inputHandler}
              name='mobile'
              value={editForm.contacts[index].mobile}
            />
            <input type="email"
              onChange={inputHandler}
              name='email'
              value={editForm.contacts[index].email}
            />
            <input type="text"
              onChange={inputHandler}
              name='address'
              value={editForm.contacts[index].address}
            />

            <div className="edit-form-cta flex gap-md">
              <Button type='submit' variant="save">Save</Button>
              <Button type='button' onClick={() => navigate(-1)} variant="cancel">Cancel</Button>
            </div>

          </form>
        </div>

        {/* Right-section  */}
        <div className="editContact-user-right bg-success-color flex flex-col justify-center align-center">
          <div className="contact-card-profile">
            <ContactCardProfile />
          </div>
          <h2 className='editContact-user-head'>{toProperCase(user.contacts[index].name)}</h2>
        </div>

      </div>
    </>
  )
}
