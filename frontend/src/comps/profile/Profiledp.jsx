import React, { useContext } from 'react'
import { Usercontext } from '../../App'

export default function Profiledp() {
  const { user } = useContext(Usercontext)
  const imgStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover'
  }
  return (
    <>
      {
        user.profile ?
          <img style={imgStyle} className='profile-dp-img' src={user.profile} alt="profile" />
          :
          <img style={imgStyle} className='profile-dp-img' src="/defaultProfile.png" alt="default profile" />
      }
    </>

  )
}
