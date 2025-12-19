import React, { useContext } from 'react'
import { toProperCase } from '../../utility/utility'
import { Link, useNavigate } from 'react-router-dom'
import { deleteContact } from '../../api/api'
import { Usercontext } from '../../App'
import Contact from './contact'

export default function ContactList({ user }) {

  const contactListWrap = {
    width: '100%',
    maxWidth: '768px',
    display: 'flex',
    flexDirection: 'column',
    margin: ' 1rem auto',
    gap: ' 1.5rem'
  }

  const contactListStyle = {
    textDecoration: 'none',
    color: "#000"
  }

  return (
    <div style={contactListWrap}>
      {user.contacts &&
        user.contacts.map((c, i) => {
          return <Link style={contactListStyle} to={`/contact-card/${c._id}/${i}`}><Contact key={i} index={i} contact={c} /></Link>
        })
      }
    </div>
  )
}
