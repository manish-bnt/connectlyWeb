import React, { useState } from 'react'
import Button from '../buttons/Button'
import { editProfilePage } from '../../api/api'

export default function EditProfile({ onEditClick, user, setUser }) {
  const [editForm, setEditForm] = useState(user)

  const inputHandler = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('logToken');
    let data = await editProfilePage(editForm, token)
    alert(data.msg)
    setUser(data.newData)
  }

  const editInput = {
    height: '2rem',
    paddingLeft: '0.575rem'
  }
  return (
    <form style={{ width: '100%' }} onSubmit={updateProfile} className='edit-profile-container flex flex-col gap-md'>
      <h2 style={{ fontWeight: '500', color: '#333' }}>EDIT</h2>
      <input style={editInput} type="text"
        onChange={inputHandler}
        name='username'
        value={editForm.username}
      />
      <input style={editInput} type="email"
        onChange={inputHandler}
        name='email'
        value={editForm.email}
      />
      <div className="edit-profile-cta flex gap-md">
        <Button type="submit" variant="save">Update</Button>
        <Button type="button" onClick={onEditClick} variant='cancel'>Cancel</Button>
      </div>
    </form>
  )
}
