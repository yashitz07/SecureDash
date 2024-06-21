import React from 'react';
import './otherlogin.css';
import backgroundImage from './assets/background.jpg';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
const OtherLogin = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
    const redirectUri = `${import.meta.env.VITE_SERVER_URL}/auth/github/callback`;

    const handleGoogleLoginSuccess = (credentialResponse) => {
        const { credential } = credentialResponse;
        if (credential) {
            const decoded = jwtDecode(credential);
            console.log(decoded);

            // Assuming the decoded JWT has user information, like email and name
            const { email, name } = decoded;

            // Update the logged-in state and navigate to the welcome page
            setIsLoggedIn(true);
            console.log(`User signed in with email: ${email}`);
            alert(`Welcome ${name}!`);

            navigate('/welcome', { state: { isGoogleUser: true } });
        }
    };

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
        alert('Google Sign-In failed. Please try again.');
    };

    const handleGitHubLogin = () => {
        // Redirect user to GitHub authorization URL
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    };

    return (
        <div className="other-login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="other-login-form">
                <h2>Other Options</h2>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    cookiePolicy={'single_host_origin'}
                />
                <button className="btn btn-microsoft">
                    Login with Microsoft
                </button>
                <button className="btn btn-github" onClick={handleGitHubLogin}>
                    Login with GitHub
                </button>
            </div>
        </div>
    );
}

export default OtherLogin;
