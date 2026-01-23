import React, { useContext } from 'react'
import { toProperCase } from '../../utility/utility'
import { Link, useNavigate } from 'react-router-dom'
import { deleteContact } from '../../api/api'
import { Usercontext } from '../../App'
import Contact from './Contact'
import './ContactList.css'
export default function ContactList({ user }) {


 

  return (
    <div className='contactListWrap'>
      {user.contacts &&
        user.contacts.map((c, i) => {
          return <Link key={i} className='contactListStyle' to={`/contact-card/${c._id}/${i}`}><Contact key={i} index={i} contact={c} /></Link>
        })
      }
    </div>
  )
}

