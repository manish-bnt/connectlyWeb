import React, { useContext } from 'react'
import { Usercontext } from '../App'
// import Contact from './Contact'
import './HomePage.css'
import ContactList from '../comps/contact_list/ContactList'
import { toProperCase } from '../utility/utility'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
  const { user } = useContext(Usercontext)

  return (
    <section className='home-section'>
      <div className='top-user-info'>
        <h1>Welcome {toProperCase(user.username)}</h1>
        <p>
          {
            user.contacts.length > 0 ? "Your contact lists" : "Add your contacts"
          }
        </p>
      </div>
      <ContactList user={user} />
    </section>
  )
}
