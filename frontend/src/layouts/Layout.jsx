import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './Layout.css'
import Navbar from './Navbar'
export default function Layout() {
  const navigate = useNavigate()
  const token = localStorage.getItem('logToken')

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        {
          token &&
          <div className="add-contact-div bg-success-color">
            <i onClick={() => navigate('/add-contact')} className="fa-solid fa-plus add-icon"></i>
          </div>
        }
      </main>
    </>
  )
}
