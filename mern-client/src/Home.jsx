// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'; 
import './Home.css'
import backgroundImage from './assets/bg.jpg'; 
const Home = () => {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <h1>Welcome to Your App</h1>
        <Link to="/register" className="login-button">Register</Link>
      </div>
    </div>
  )
}

export default Home