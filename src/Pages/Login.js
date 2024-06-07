import React, { useState } from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        const response = await fetch('https://sonar-lipi-server.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setLoading(false); // Hide loader
        if (data.auth) {
            localStorage.setItem('token', data.token);
            window.location.href = "/dashboard";
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className='auth-form'>
            <div className="form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <div className="button-loader"></div>
                        ) : (
                            'Login'
                        )}
                    </button>
                    Not Registered? <Link to={'/register'}>Register</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
