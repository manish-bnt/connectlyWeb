import React, { useContext } from 'react'
import { toProperCase } from '../../utility/utility'
// import DeleteButton from '../buttons/DeleteButton'
// import EditButton from '../buttons/EditButton'
import '../../styles/utilities.css'
import { useNavigate } from 'react-router-dom'
import Button from '../buttons/Button'
import { Usercontext } from '../../App'
export default function ContactCardInfo({ index, contact }) {
  const token = localStorage.getItem('logToken')
  const { onDeleteContact } = useContext(Usercontext)
  const navigate = useNavigate()
  if (!contact) return null

  const editContact = () => {
    // console.log("contact edit ", contact)
    navigate(`/edit-contact/${contact._id}/${index}`)
    return null
  }

  return (
    <div className="flex flex-col align-start gap-md f-shrink-0">
      <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left pointer"></i>
      <p><b>Name: </b>{toProperCase(contact.name)}</p>
      <p><b>Mobile: </b>{contact.mobile}</p>
      <p><b>Email: </b>{contact.email}</p>
      <p><b>Address: </b>{toProperCase(contact.address)}</p>
      <div className="flex gap-md">
        <Button onClick={(e) => onDeleteContact(e, contact, token, navigate)} variant="delete">Delete</Button>
        <Button onClick={editContact} variant="edit">Edit</Button>
      </div>
    </div>
  )
}
