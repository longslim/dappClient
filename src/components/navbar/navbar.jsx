import React from 'react'
import "./navbar.css"
import logo from "/logo.svg" 
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar_logo'>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className='navbar_links'>
        <NavLink to="/signup">
          <h5>Github Docs</h5>
        </NavLink>
        <NavLink to="/login">
          <h5>Wallet Apps</h5>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
