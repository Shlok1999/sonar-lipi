import React from 'react'
import '../Styles/Navbar.css'
function Navbar() {
  let login = true;
  return (
    <section className='navbar-section'>
      <nav className='nav-container'>
        <figure className='logo'>
          <a href="/">
            <img width={100} src={require('../Asset/sonar-lipi-logo.png')} alt="" />
          </a>
        </figure>
        <ul>
          <li>About</li>
          <li>Features</li>
          <li>Contact</li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/login">Login</a></li>


        </ul>
      </nav>
    </section>
  )
}

export default Navbar