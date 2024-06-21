import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const GitHubLoginSuccess = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    useEffect(() => {
        if (token) {
            // Store the token in the axios default headers for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsLoggedIn(true);
            navigate('/welcome');
        } else {
            navigate('/other-login?error=github_auth_failed');
        }
    }, [token, setIsLoggedIn, navigate]);

    return <div>Loading...</div>;
};

export default GitHubLoginSuccess;
