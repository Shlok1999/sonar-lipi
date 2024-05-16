import React from 'react'
import '../Styles/Homepage.css'
function Homepage() {
  return (
    <section className='homepage-section'>
      <div className="homepage-container">
        <figure style={{ display: 'flex', alignItems: 'center' }}>
          <h1>Powered By</h1>
          <img width={300} src={require('../Asset/Nadvenu-logo_With-white-Stroke(1) (1).png')} alt="" />
        </figure>
      </div>
      <div className="hero-section">
        <h1 className='sonar' style={{ color: 'red' }}> <span>S</span>
        <span style={{color: 'green'}}>O</span>
        <span style={{color: 'red'}}>N</span>
        <span style={{color: 'green'}}>A</span>
        <span>R</span></h1> <h1 className='lipi' style={{ color: 'brown' }}>-लिपि</h1>
      </div>
    </section>
  )
}

export default Homepage