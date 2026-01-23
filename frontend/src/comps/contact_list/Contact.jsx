import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toProperCase } from '../../utility/utility'
import './Contact.css'
import '../../styles/utilities.css'
import ContactProfile from '../contact_card/ContactCardProfile'
import Button from '../buttons/Button'
import { Usercontext } from '../../App'
export default function Contact({ contact, index }) {

  const { loadUser, onDeleteContact } = useContext(Usercontext)
  let token = localStorage.getItem('logToken');
  const navigate = useNavigate()
  const viewHandler = (e) => {
    e.preventDefault()
    navigate(`/contact-card/${contact._id}/${index}`)
  }

  return (
    <div className='contact-list flex justify-between align-center box-grey-shadow'>
      <div className='contact-info flex gap-md align-center'>
        <div className="contact-profile">
          <ContactProfile />
        </div>
        <p>{toProperCase(contact.name)}</p>
      </div>
      <div className='flex gap-md'>
        {/* <Button onClick={viewHandler} variant="view">View</Button> */}
        {/* <Button onClick={(e) => onDeleteContact(e, contact, token, navigate)} variant="delete">Delete</Button> */}
      </div>
    </div>
  )
}
