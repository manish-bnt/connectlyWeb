import React from 'react'
import './ContactCard.css'
import '../../styles/utilities.css'
import ContactCardInfo from './ContactCardInfo'
import ContactCardProfile from './ContactCardProfile'
import { toProperCase } from '../../utility/utility'

export default function ContactCard({ index, contact }) {
  if (!contact) return null
  return (
    <>

      <div className="contact-card-container flex">
        {/* Left-section  */}
        <div className="right-contact-card-sec flex align-center justify-center">
          <div className="contact-card flex box-grey-shadow justify-between">
            <ContactCardInfo index={index} contact={contact} />
            <div className="contact-card-profile">
              <ContactCardProfile />
            </div>
          </div>
        </div>


        {/* Right-section  */}
        <div className="left-contact-card-sec bg-success-color flex flex-col justify-center align-center gap-md">
          <div className="contact-card-profile">
            <ContactCardProfile />
          </div>
          <h2 className='contact-card-head'>{toProperCase(contact.name)}</h2>
        </div>



      </div>

    </>

  )
}
