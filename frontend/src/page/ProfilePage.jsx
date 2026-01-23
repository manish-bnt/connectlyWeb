import React, { useContext } from 'react'
import Profile from '../comps/profile/Profile'
import { Usercontext } from '../App'

export default function ProfilePage() {
  const { user, setUser } = useContext(Usercontext)
  return (
    <>
      <section className='profile-section'>
        <Profile user={user} setUser={setUser} />
      </section>
    </>
  )
}
