import React, { useState } from 'react'
import UploadProfile from '../comps/profile/UploadProfile'
import { useLocation } from 'react-router-dom'

export default function UploadProfilePage() {
  const location = useLocation();
  const { pickedFile, previewUrl } = location.state || {}

  return (
    <section className="upload-profile-section">
      <UploadProfile pickedFile={pickedFile} previewUrl={previewUrl} />
    </section>
  )
}
