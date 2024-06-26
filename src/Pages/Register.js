import React, { useState } from 'react';
// import { useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/Login.css'
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const history = useNavigation();

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('https://sonar-lipi-server.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            window.location.href = "/login"
        } else {
            alert('Registration failed');
        }
    };

    return (
        <div className='auth-form'>
            <div className="form">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Register</button>
                    Already Registered? <Link to={'/login'}>Login</Link>

                </form>
            </div>

        </div>
    );
};

export default Register;
