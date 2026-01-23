import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import { createContext } from 'react'
import { useEffect } from 'react'
import { deleteContact, getProfile, requestOTP } from './api/api'
import Layout from './layouts/Layout'
import HomePage from './page/HomePage'
import ContactCardPage from './page/ContactCardPage'
import EditContactPage from './page/EditContactPage'
import AddContactPage from './page/AddContactPage'
import SignupPage from './page/SignupPage'
import Signinpage from './page/Signinpage'
import ProfilePage from './page/ProfilePage'
import AccountPage from './page/AccountPage'
import ResetPasswordPage from './page/ResetPasswordPage'
import OtpPage from './page/OtpPage'
import ResetPasswordLayout from './layouts/ResetPasswordLayout'
import NewPasswordPage from './page/NewPasswordPage'
import ResetPassAuth from './Authentication/ResetPassAuth'
import ProfileLayout from './layouts/ProfileLayout'
import UploadProfilePage from './page/UploadProfilePage'
import Nopage from './page/Nopage'
import Auth from './layouts/Auth'
export const FETCH_URL = import.meta.env.VITE_API_URL
export const Usercontext = createContext()

function App() {


  const [user, setUser] = useState("") //global user logged data
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  async function loadUser() {
    let token = localStorage.getItem('logToken') || null;

    if (!token) {
      setLoading(false)
      return
    }
    let profileData = await getProfile(token)
    setUser(profileData.newData)
    setLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])


  //Globally otp 
  const onRequestOtp = async (email, purpose) => {
    try {
      let data = await requestOTP(email, purpose)

      if (!data) return null
      return data
    } catch (error) {
      console.error('OTP request failed:', error.message)
      return null
    }
  }


  //Globally delete contact
  const onDeleteContact = async (event, contact, myToken, navigate) => {
    event.preventDefault()
    // event.stopPropagation();
    //console.log("contacgfdsfsd ", contact)
    let confirmation = confirm(`Are you sure to delete \n "${contact.name}" `)
    if (!confirmation) return

    let data = await deleteContact(contact._id, myToken)
    if (!data) return
    //console.log("backend deleted contact response ", data)
    alert(data.msg)
    await loadUser()
    navigate('/')
  }

  // console.log("ENV URL:", FETCH_URL);


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <>
              <Auth>
                <HomePage />
              </Auth>
            </>

          )
        },
        {
          path: 'signup',
          element: <SignupPage />
        },
        {
          path: 'signup-verify',
          element: (
            <ResetPassAuth>
              <OtpPage />
            </ResetPassAuth>
          )
        },
        {
          path: 'signin',
          element:
            <Signinpage />
        },
        {
          path: 'profile',
          element: <ProfileLayout />,
          children: [
            {
              index: true,
              element: <ProfilePage />
            },
            {
              path: 'upload-Profile',
              element: <UploadProfilePage />
            }
          ]
        },
        {
          path: 'add-contact',
          element: (
            <Auth>
              <AddContactPage />
            </Auth>
          )
        },
        {
          path: 'edit-contact/:id/:index',
          element: (
            <Auth>
              <EditContactPage />
            </Auth>
          )
        },
        {
          path: 'contact-card/:id/:index',
          element: (
            <Auth>
              <ContactCardPage />
            </Auth>
          )
        },
        {
          path: 'setting/account/',
          element: (
            <Auth>
              <AccountPage />
            </Auth>
          )
        },
        {
          path: 'reset-password',
          element: <ResetPasswordLayout />,
          children: [
            {
              index: true,
              element: (
                <ResetPasswordPage />
              )
            },
            {
              path: 'verify-otp',
              element: (
                <ResetPassAuth>
                  <OtpPage />
                </ResetPassAuth>
              )
            },
            {
              path: 'new-password',
              element: (
                <ResetPassAuth>
                  <NewPasswordPage />
                </ResetPassAuth>
              )
            },
          ]
        },
      ]
    },
    {
      path: '*',
      element: <Nopage />
    },
  ])
  return (
    <>
      <Usercontext.Provider value={{
        user,
        setUser,
        loading,
        setLoading,
        loadUser,
        onDeleteContact,
        onRequestOtp,
        isOtpVerified,
        setIsOtpVerified
      }}>
        <RouterProvider router={router} />
      </Usercontext.Provider>
    </>
  )
}

export default App
