import React, { useState } from 'react';
import '../Styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  let login = false;
  const token = localStorage.getItem('token');
  if (token) {
    login = true;
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className='navbar-section'>
      <nav className={`nav-container ${menuOpen ? 'menu-open' : ''}`}>
        <figure className='logo'>
          <a href='/'>
            <img width={100} src={require('../Asset/sonar-lipi-logo.png')} alt='' />
          </a>
        </figure>
        <ul className={`menu ${menuOpen ? 'show-menu' : ''}`}>
          <li className='link'><a href="/">About</a></li>
          <li className='link'><a href="/">Features</a></li>
          <li className='link'><a href="/">Contact</a></li>
          <li className='link'>
            {login ? <a href='/dashboard'>Dashboard</a> : <a href='/login'>Login</a>}
          </li>
          <li onClick={()=>localStorage.removeItem('token')} className='link' style={{background: 'brown', width: '120px', padding: '0.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: 'white', cursor: 'pointer'}}>
            {
              login? <>Logout</>:<></>
            }
          </li>
        </ul>
        <div className='menu-icon' onClick={handleMenuToggle}>
          <img width={30} src='https://img.icons8.com/ffffff/2x/menu' alt='' />
        </div>
      </nav>
      {
        menuOpen?
        <ul className={`menu-small-screen ${menuOpen ? 'show-menu' : ''}`}>
        <li className='link'><a href="/">About</a></li>
        <li className='link'><a href="/">Features</a></li>
        <li className='link'><a href="/">Contact</a></li>
        <li className='link'>
          {login ? <a href='/dashboard'>Dashboard</a> : <a href='/login'>Login</a>}
        </li>
        <li onClick={()=>{
          localStorage.removeItem('token');
          window.location.href="/login"
          }
          } className='link' style={{background: 'brown', width: '120px', padding: '0.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: 'white', cursor: 'pointer'}}>
            {
              login? <>Logout</>:<></>
            }
          </li>
      </ul>:<></>
      }
      
    </section>
  );
}

export default Navbar;
