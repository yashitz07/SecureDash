import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import './Welcome.css';
import videoSource from './assets/1.mp4';
import axios from 'axios';

const Welcome = ({ setIsLoggedIn }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isGoogleUser = location.state?.isGoogleUser;
    const isMicrosoftUser = location.state?.isMicrosoftUser;
    const msalInstance = location.state?.msalInstance;

    const handleGoogleLogout = () => {
        googleLogout();
        handleLogout();
    };

    // const handleMicrosoftLogout = () => {
    //     if (msalInstance) {
    //         msalInstance.logout();
    //     }
    //     handleLogout();
    // };

    const handleLogout = async () => {
        try {
            // Clear session on the backend
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`, { withCredentials: true });
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            // Update login state
            setIsLoggedIn(false);
            // Redirect to login page
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle logout failure
        }
    };

    return (
        <div className="main">
            <video autoPlay loop id="video" playsInline>
                <source src={videoSource} type="video/mp4" />
            </video>
            <div className="overlay"></div>
            <div className="heading">
                <h1 className="head">WELCOME TO OUR <span>WEBSITE</span></h1>
                {isGoogleUser ? (
                    <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleGoogleLogout}>
                        LogOut from Google
                    </button>
                ) : isMicrosoftUser ? (
                    <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleMicrosoftLogout}>
                        LogOut from Microsoft
                    </button>
                ) : (
                    <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>
                        LogOut
                    </button>
                )}
            </div>
        </div>
    );
};

export default Welcome;
