import React, { useContext, useRef, useState } from 'react'
import { deleteProfileImg, uploadProfile } from '../../api/api'
import { Usercontext } from '../../App'
import './UploadProfile.css'
import '../../styles/utilities.css'
import Button from '../buttons/Button'
import { useNavigate } from 'react-router-dom'
export default function UploadProfile({ pickedFile, previewUrl }) {
  const { loadUser } = useContext(Usercontext)
  const navigate = useNavigate()

  const uploadHandler = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('logToken')
    if (!pickedFile) {
      alert('Please select an image first.')
      return
    }
    const formData = new FormData();
    formData.append("profileImg", pickedFile);

    let data = await uploadProfile(formData, token);

    if (!data) return;
    alert(data.msg);
    await loadUser();
    navigate(-1)

  }

  // const deleteProfile = async (e) => {
  //   e.preventDefault()
  //   let data = await deleteProfileImg(token)
  //   if (!data) return
  //   alert(data.msg)
  //   await loadUser()
  // }

  return (
    <div className="upload-image-container flex gap-md">

      {/* Left-section */}
      <div className="upload-left-section flex flex-col justify-center align-center gap-md">

        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        )}

        <Button onClick={uploadHandler} type="submit" variant="save">Upload</Button>

      </div>

      {/* Right section  */}
      <div className="upload-right-section flex flex-col justify-center align-center bg-success-color">
        <i class="fa-solid fa-circle-user user-icon"></i>
        <h2 className="upload-head">MyProfile</h2>

      </div>

    </div>
  )
}
