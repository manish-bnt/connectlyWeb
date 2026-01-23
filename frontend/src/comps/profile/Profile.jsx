import React, { useContext, useRef, useState } from 'react'
import './Profile.css'
import '../../styles/utilities.css'
import Button from '../buttons/Button'
import EditProfile from './EditProfile'
import Profiledp from './Profiledp'
import UploadProfile from './UploadProfile'
import { deleteProfileImg, uploadProfile } from '../../api/api'
import { Usercontext } from '../../App'
import { useNavigate } from 'react-router-dom'
import ProfilePage from '../../page/ProfilePage'
export default function Profile({ user, setUser }) {
  const { loadUser } = useContext(Usercontext)
  const [editClick, setEditClick] = useState(false)
  const [profile, setProfile] = useState("")
  const [preview, setPreview] = useState("")
  const navigate = useNavigate()
  const fileRef = useRef()
  if (!user) return null

  const onEditClick = () => {
    setEditClick(prev => !prev)
  }


  const openFilePicker = (e) => {
    fileRef.current.click()
  }

  const handleFile = async (e) => {
    const pickedFile = e.target.files[0];
    if (!pickedFile) return;
    setProfile(pickedFile)
    const previewUrl = URL.createObjectURL(pickedFile)
    setPreview(previewUrl)
    //console.log("pickedFile ", URL.createObjectURL(pickedFile))
    navigate('/profile/upload-profile', {
      state: {
        pickedFile,
        previewUrl
      }
    })
  }

  const deleteProfile = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('logToken')
    let data = await deleteProfileImg(token)
    if (!data) return
    alert(data.msg)
    await loadUser()
  }

  return (
    <div className="profile-container flex">


      {/* Left Side */}
      <div className="profile-left flex flex-col justify-center align-center">

        <div className="profile-avatar">
          <Profiledp />
          <div className="add-profile-icon flex justify-center align-center">
            <i onClick={openFilePicker} className="fa-solid fa-plus"></i>
          </div>

          {/* Hidden file input  */}
          <input type="file" style={{ display: 'none', }}
            ref={fileRef}
            onChange={handleFile}
            name='profileImg'
          />

        </div>

        {
          user.profile &&
          <div className="profile-avatar-cta flex justify-center gap-md">
            <Button onClick={deleteProfile} type="button" variant="delete">Delete Profile</Button>
          </div>
        }


        <div className="profile-info-wrap flex">
          {
            editClick ? <EditProfile onEditClick={onEditClick} user={user} setUser={setUser} />
              :
              <div className="profile-info flex flex-col gap-md">
                <p><strong>Name:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>

              </div>
          }
          {!editClick && <i onClick={onEditClick} className="fa-solid fa-pencil pencil-icon pointer color-success"></i>}

        </div>
      </div>

      {/* Right Side */}
      <div className="profile-right flex flex-col justify-center align-center bg-success-color">
        <i className="fa-solid fa-circle-user user-icon"></i>
        <h2 className="profile-head">MyProfile</h2>
      </div>

    </div>
  )
}
