import React, { useState } from 'react';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simple validation (you'd likely have more robust validation)
        if (!email || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            // Simulate an API call (replace with your actual API endpoint)
            const response = await fetch('http://localhost:8080/rest/auth/login', {  //  Backend API Endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                console.log('Login successful!', data);
                // Store the token in localStorage (or a cookie)
                localStorage.setItem('token', data.token);

                // Redirect to a protected route (e.g., dashboard)
                window.location.href = '/book'; // Replace '/dashboard' with your actual route

            } else {
                // Login failed
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}

            <div>
                <p>username: your email</p>
                <p>password: 123456</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p> {/* Optional: Link to register page */}
        </div>
    );
}

export default Signin;