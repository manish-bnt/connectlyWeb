import React, { useContext } from 'react'
// import Contact from '../comps/contact'
import ContactCard from '../comps/contact_card/ContactCard'
import { Usercontext } from '../App'
import { useParams } from 'react-router-dom'

export default function ContactCardPage() {
  const { user, deleteHandler, loadUser } = useContext(Usercontext)
  const { index } = useParams()
  return (
    <section className='contact-card-page'>
      <ContactCard index={index} contact={user.contacts[index]} />
    </section>
  )
}
