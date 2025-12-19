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


  return (
    <nav className="navbar flex align-center justify-between">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/">
          <img className="logo" src="/connectly-logo.png" alt="logo" />
        </Link>
      </div>

      {/* Right */}


      {
        !token ?
          <div className="navbar-right flex gap-md">
            <Button onClick={() => navigate('/signup')} variant="auth">Signup</Button>
            <Button onClick={() => navigate('/signin')} variant="auth">Signin</Button>
          </div>
          :
          <div ref={dropRef.current} className="navbar-right">
            <div
              className="profile-circle flex align-center justify-center pointer"
              onClick={() => setOpen(!open)}
            >
              <Profiledp />
            </div>

            {open && <ProfileDropdown open={open} setOpen={setOpen} user={user} />}
          </div>
      }

    </nav>
  );
}
