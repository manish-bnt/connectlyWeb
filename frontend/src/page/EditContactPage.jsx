import React from 'react'
import ContactEditForm from '../comps/contact_card/ContactEditForm'
import { useParams } from 'react-router-dom'

export default function EditContactPage() {
  const { index } = useParams()
  return (
    <section style={{ width: '100%', height: '100%' }} className='edit-contact-section'>
      <ContactEditForm index={index} />
    </section>
  )
}
