import { FETCH_URL } from "../App"

//send signup request to the backend and create a new user account.
export async function signUp(formData) {
  let res = await fetch(`${FETCH_URL}/auth/signup`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formData)
    })
  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()
}


//send signin(login) request to the backend to access user account.
export async function signIn(logInput) {
  let res = await fetch(`${FETCH_URL}/auth/signin`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(logInput)
    })

  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()
}


//Retreive logged user's profile details using the token.
export async function getProfile(myToken) {
  let res = await fetch(`${FETCH_URL}/auth/me-profile`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${myToken}`
    }
  })

  if (res.status === 401) {
    localStorage.removeItem('logToken')

    //force redirect 
    window.location.href = "/signin"
    return null
  }

  if (!res.ok) {
    let errData = await res.json()
    alert(errData.msg)
    return null
  }

  return await res.json()
}


//Send profile update request to the backend
export async function editProfilePage(editInput, myToken) {
  let res = await fetch(`${FETCH_URL}/profile/update`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${myToken}`,
      },
      body: JSON.stringify(editInput)
    })

  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()
}


//Send a request to delete the user's account.
export async function deleteAccount(myToken, email) {
  let res = await fetch(`${FETCH_URL}/profile/delete`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
      body: JSON.stringify({ email })
    })

  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()

}


//Upload user profile image to the backend.
export async function uploadProfile(profileImg, myToken) {
  let res = await fetch(`${FETCH_URL}/profile/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${myToken}` },
    body: profileImg
  })

  if (!res.ok) {
    let errData = await res.json()
    return alert(errData.msg)
  }

  return res.json()
}


//Send request to delete user profile image.
export async function deleteProfileImg(myToken) {
  let res = await fetch(`${FETCH_URL}/profile/delete-profile-img`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${myToken}` }
  })

  if (!res.ok) {
    let errorData = await res.json()
    alert(errorData.msg)
    return
  }
  return res.json()
}


// Send a request to add a contact to the user's contact list.
export async function addContact(addForm, myToken) {
  let res = await fetch(`${FETCH_URL}/contact/add-contact`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
      body: JSON.stringify(addForm)
    })
  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()

}



// Send a request to delete a contact from  the user's contact list.
export async function deleteContact(contactId, myToken) {
  let res = await fetch(`${FETCH_URL}/contact/delete-contact/${contactId}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
    })


  if (!res.ok) {
    const errData = await res.json()
    alert(errData.msg)
    return
  }
  return await res.json()
}


// Send a request to update a user's contact.
export async function updateContact(myToken, updatedForm, index) {
  let res = await fetch(`${FETCH_URL}/contact/update-contact`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${myToken}`
    },
    body: JSON.stringify({ newData: updatedForm, id: index })
  })

  if (!res.ok) {
    let errorData = await res.json()
    alert(errorData.msg)
  }

  return await res.json()

}


//Send a OTP request to the backend for reset password.
export async function requestOTP(email, purpose) {
  let res = await fetch(`${FETCH_URL}/auth/request-otp`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, purpose })
  })

  if (!res.ok) {
    let errorData = await res.json()
    alert(errorData.msg)
    return
  }
  return await res.json()
}




export async function signupVerifyOtpApi(email, otp, purpose) {
  const res = await fetch(`${FETCH_URL}/auth/signup-verify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, otp, purpose })
  })

  if (!res.ok) {
    const errorData = await res.json()
    alert(errorData.msg)
    return
  }

  return await res.json()
}

export async function verifyOtpApi(email, otp, purpose) {
  const res = await fetch(`${FETCH_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, otp, purpose })
  })

  if (!res.ok) {
    const errorData = await res.json()
    alert(errorData.msg)
    return
  }

  return await res.json()
}

//Send request to update password. 
export async function newPassword(password, email) {
  let res = await fetch(`${FETCH_URL}/auth/new-password`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password, email })
  })

  if (!res.ok) {
    let errorData = await res.json()
    alert(errorData.msg)
    return
  }
  return await res.json()
}