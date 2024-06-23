import React from 'react'
import './MoreInfo.css';
import landingimg from "./assets/2.jpeg"
const MoreInfo = () => {
  return (
    <div id="more-info" className="auth-container">
      <div className="auth-image-container">
        <img src={landingimg} alt="Secure Access" className="auth-image"/>
      </div>
      <div className="auth-content">
        <h1 className="auth-title">
          Welcome to <span className="highlight">SecureDash!</span>
        </h1>
        <p className="auth-description">
          Your one-stop authentication provider offering robust security solutions.
          <br />
          <strong>Protecting your information is our top priority.</strong> This website utilizes 
          <span className="highlight"> state-of-the-art security measures</span> to keep your data safe and private.
        </p>
        <ul className="auth-features">
          <li><strong>Unbreakable Passwords:</strong> Encrypted storage keeps your password safe.</li>
          <li><strong>Multi-Factor Login:</strong> Add an extra layer of security for your account.</li>
          <li><strong>Constant Security Updates:</strong> We stay vigilant against evolving threats.</li>
          <li><strong>Encrypted Data Transfer:</strong> Your information travels securely online.</li>
          <li><strong>Secure Sessions:</strong> Logins automatically expire to prevent unauthorized access.</li>
          <li><strong>Dedicated Security Team:</strong> Experts work to safeguard your data.</li>
        </ul>
        <a href="/register" className="register-link">
          <button className="register-button">
            Register Now
          </button>
        </a>
      </div>
      
    </div>
  )
}

export default MoreInfo
