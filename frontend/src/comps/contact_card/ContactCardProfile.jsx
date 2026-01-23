import React from 'react'

export default function ContactCardProfile() {
  const cardProfile = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  }

  return (
    <img style={cardProfile} src="/defaultProfile.png" alt="card-profile" />
  )
}
