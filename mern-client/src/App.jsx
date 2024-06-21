import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css'
import Signup from './Signup'
import Login from './Login'
import axios from 'axios';
import Home from './Home'
import Welcome from './Welcome'
import OtherLogin from './OtherLogin'
import GitHubLoginSuccess from './GitHubLoginSuccess'


const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/other-login" element={<OtherLogin setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/github-login-success" element={<GitHubLoginSuccess setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/welcome"
          element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />}
        />
      
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
