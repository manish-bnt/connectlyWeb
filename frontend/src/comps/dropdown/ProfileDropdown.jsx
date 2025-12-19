import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProfileDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../../App";
import Button from "../buttons/Button";

export default function ProfileDropdown({ open, setOpen, user }) {
  const { loadUser } = useContext(Usercontext)
  const [view, setView] = useState("main")
  const navigate = useNavigate()
  const dropRef = useRef()

  console.log("dropref ", dropRef.current)

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

  const logoutHandler = async () => {
    let confirmation = confirm("Are you sure you want to logout?")
    if (!confirmation) return
    localStorage.removeItem('logToken')
    await loadUser()
    navigate('/signin')
  }

  return (
    <div ref={dropRef} className="dropdown">
      <div className="dropdown-header">
        <p className="name">{user.username}</p>
        <p className="email">{user.email}</p>
      </div>

      <hr />

      {
        view === "main" &&
        (
          <div className="dropdown-links flex flex-col">
            <Link to="/" className="link-style">Home</Link>
            <Link to="/add-contact" className="link-style">Add Contact</Link>
            <Link to="/profile" className="link-style">Profile</Link>
            <Button onClick={(e) => setView("setting")} variant="setting">Setting</Button>
            <Link onClick={logoutHandler} className="link-style logout">Logout</Link>

          </div>
        )
      }

      {
        view === "setting" &&
        (
          <div className="dropdown-links flex flex-col">
            <Button onClick={() => setView("main")} variant="back"><i class="fa-solid fa-arrow-left"></i></Button>
            <Link to="/setting/account" className="submenu link-style">Account</Link>
          </div>

        )
      }
    </div>
  );
}
