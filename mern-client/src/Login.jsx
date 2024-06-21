import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Login.css'
import backgroundImage from './assets/background.jpg'; 
const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!email || !password) {
          alert('Please fill in all fields');
          return;
      }

        axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {email, password})
        .then(res => {
            console.log("login: " + res.data);
            if(res.data.Status === "Success") {
              setIsLoggedIn(true);
              navigate('/welcome')
              alert("Login successfully")
                
            }else{
                alert("Sorry Password is incorrect")
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        <p>Try other option? <Link to="/other-login">other-login</Link></p>
      </div>
    </div>
  )
}

export default Login