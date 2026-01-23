import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileDropdown from "../comps/dropdown/ProfileDropdown";
import "./Navbar.css";
import '../styles/utilities.css'
import Profiledp from "../comps/profile/Profiledp";
import { Usercontext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Button from "../comps/buttons/Button";
export default function Navbar() {
  const { user } = useContext(Usercontext)
  const [open, setOpen] = useState(false);
  const dropRef = useRef()
  const navigate = useNavigate()
  const token = localStorage.getItem('logToken')


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [])

  return (
    <nav className="navbar flex align-center justify-between">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/">
          <img className="logo" src="/connexLogo.png" alt="logo" />
        </Link>
      </div>

      {/* Right */}


      {
        !token ?
          <div className="navbar-right flex gap-md">
            <Button onClick={() => navigate('/signup')} variant="auth">Signup</Button>
            <Button onClick={() => navigate('/signin')} variant="auth">Login</Button>
          </div>
          :
          <div ref={dropRef} className="navbar-right">
            <div
              // ref={dropRef}
              className="profile-circle flex align-center justify-center pointer"
              onClick={(e) => {
                setOpen(!open)
              }}
            >
              <Profiledp />
            </div>
            {open && <ProfileDropdown user={user} />}

          </div>
      }

    </nav >
  );
}
