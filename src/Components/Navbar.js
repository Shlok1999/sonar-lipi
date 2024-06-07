import React, { useState } from 'react';
import '../Styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  let login = false;
  const token = localStorage.getItem('token');
  if (token) {
    login = true;
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    window.location.href="/login"
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='nav-bar-section'>
      <div className="logo">
        <img width={'100px'} src={require('../Asset/sonar-lipi-logo.png')} alt="" />
      </div>
      <ul className='link-container'>
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        {
          login ?
            <li><a href="/dashboard">Dashboard</a></li>
            
            :
            <li><a href="/login">Login</a></li>
        }

        {
          login ? <li onClick={logout}>Logout</li>
            : <></>
        }
      </ul>
      <img onClick={handleMenuToggle} className='menu' style={{ width: '30px', cursor: 'pointer' }} src="https://img.icons8.com/ffffff/menu" alt="" />


      <div className={menuOpen?'nav-small-screen-show':'nav-small-screen'}>
      <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        {
          login ?
            <li><a href="/dashboard">Dashboard</a></li>
            :
            <li><a href="/login">Login</a></li>
        }
        {
          login ? <li onClick={logout}>Logout</li>
            : <></>
        }


        
      </div>
    </nav>
  );
}

export default Navbar;
