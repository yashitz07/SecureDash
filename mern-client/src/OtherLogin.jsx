import React, { useEffect, useState } from 'react';
import './otherlogin.css';
import backgroundImage from './assets/background.jpg';
import { GoogleLogin } from '@react-oauth/google';
import GoogleButton from "react-google-button";
import { useNavigate } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import {jwtDecode} from 'jwt-decode';
import GithubButton from "react-github-login-button";
import MicrosoftLogin from "react-microsoft-login";
const OtherLogin = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    const [rerender,setRerender] = useState(false);

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

    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        console.log('GitHub OAuth Code:', codeParams);

        if(codeParams && (localStorage.getItem("accessToken")==null)){
            async function getAccessToken(){
                await fetch(`${import.meta.env.VITE_SERVER_URL}/getAccessToken?code=` + codeParams,{
                    method: "GET"
                }).then((response) =>{
                    return response.json();
                }).then((data) =>{
                    console.log(data);
                    if(data.access_token){
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                        setIsLoggedIn(true);
                        navigate('/welcome');
                    } else {
                        console.error('Error in access token response:', data);
                        alert('Failed to log in with GitHub. Please try again.');
                    }
                })
            }
            getAccessToken();
        }

    }, [navigate, setIsLoggedIn]);
    
    async function getUserData(){
        await fetch(`${import.meta.env.VITE_SERVER_URL}/getUserData`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer" + localStorage.getItem("accessToken")
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
        })
    }
    
    const handleGitHubLogin = () => {
        // Redirect user to GitHub authorization URL
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    };

    // const msalConfig = {
    //     auth: {
    //         clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
    //         redirectUri:`http://localhost:5173/auth/microsoft/callback`, 
    //     }
    // };

    // const msalInstance = new PublicClientApplication(msalConfig);

    // const loginRequest = {
    //     scopes: ["user.read"]
    // };

    // const handleMicrosoftLogin = async () => {
    //     try {
    //         const response = await msalInstance.loginRedirect(loginRequest);
    //         if (response) {
    //             console.log(response);
    //             setIsLoggedIn(true);
    //             navigate('/welcome', { state: { isMicrosoftUser: true, msalInstance } });
    //         }
    //     } catch (error) {
    //         console.error('Microsoft login error:', error);
    //         alert('Microsoft Sign-In failed. Please try again.');
    //     }
    // };

    return (
        <div className="other-login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="other-login-form">
                <h2>Other Options</h2>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    cookiePolicy={'single_host_origin'}
                    theme='filled_black'
                    type='standard'
                />
               
                <br/>
                
                <GithubButton onClick={handleGitHubLogin}></GithubButton>
            {/* <button onClick={handleMicrosoftLogin}>Login with Microsoft</button> */}

            </div>
        </div>
    );
}

export default OtherLogin;