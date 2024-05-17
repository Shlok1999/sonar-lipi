import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import '../Styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.auth) {
            localStorage.setItem('token', data.token);
            // history.push('/dashboard');
            window.location.href="/dashboard"
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
                <button type="submit">Login</button>
            </form>
            </div>
            
        </div>
    );
};

export default Login;