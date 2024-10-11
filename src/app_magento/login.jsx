import React, {useState} from 'react';
import './css/style.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from './layout/header';
import Footer from './layout/footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook để điều hướng
    const handleLogin = async (e) => {
        e.preventDefault();  // Ngăn chặn form tải lại trang
        try {
            const response = await axios.post('http://magento246.com/rest/V1/integration/customer/token', {
                username: username,
                password: password
            });
            const token = response.data;  // Lưu token
            console.log(token);
            localStorage.setItem('customerToken', token);
            navigate('/');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <div>
            <Header/>
            <div className="login-container container">
                <h1>Login</h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <form onSubmit={handleLogin} className="form-login">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="form-btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;
