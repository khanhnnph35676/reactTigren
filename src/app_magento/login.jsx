import React, {useState} from 'react';
import './css/style.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from './layout/header';
import Footer from './layout/footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from './link';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook để điều hướng
    const URL = BASE_URL + '/rest/V1/integration/customer/token';
    const handleLogin = async (e) => {
        e.preventDefault();  // Ngăn chặn form tải lại trang
        try {
            const response = await axios.post(URL, {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json' // Thiết lập Content-Type
                }
            });
            const token = response.data;
            console.log(token);
            localStorage.setItem('customerToken', token);
            // Chuyển đổi token sang dạng JSON và lưu vào localStorage
            const tokenJSON = JSON.stringify({token}); // Chuyển thành JSON
            localStorage.setItem('customerToken', tokenJSON); // Lưu token dạng JSON

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
