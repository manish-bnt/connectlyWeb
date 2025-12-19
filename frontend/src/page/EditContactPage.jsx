import React from 'react'
import ContactEditForm from '../comps/contact_card/ContactEditForm'
import { useParams } from 'react-router-dom'

export default function EditContactPage() {
  const { index } = useParams()
  return (
    <section className='edit-contact-section'>
      <ContactEditForm index={index} />
    </section>
  )
}
