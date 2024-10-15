import React, {useEffect, useState} from 'react';
import logo from '../img/tigren-logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {BASE_URL} from "../link";
import axios from "axios";
import Cart from '../order/cart'

const URL = BASE_URL + '/graphql';

const CustomerDropdown = ({onClose}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('customerToken'); // Lấy token ở đây

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('customerToken');
        navigate('/login'); // Điều hướng đến trang đăng nhập
        onClose(); // Đóng dropdown nếu cần
    };

    return (
        <div className="customer-dropdown">
            <ul>
                {!token ? (
                    <li>
                        <Link to="/login">
                            <i className="fa fa-sign-in" aria-hidden="true"></i> {/* Icon cho đăng nhập */}
                            Login
                        </Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <a href='#'>
                                <i className="fa fa-user" aria-hidden="true"></i> {/* Icon cho thông tin khách hàng */}
                                Information
                            </a>
                        </li>
                        <li>
                            <Link to="/listOrder">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i> {/* Icon cho đơn hàng */}
                                Orders
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>
                                <i className="fa fa-power-off" aria-hidden="true"></i> {/* Icon cho đăng xuất */}
                                Logout
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className='wrapper-header'>
            <div className="header container">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="logo website"/>
                        My Website
                    </Link>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#">Product</a></li>
                        <li><a href="#">Block</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div className="header-icons">
                    <div className="wrapper-user">
                        <a href="#" className="icon" onClick={toggleDropdown}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </a>
                        {isDropdownOpen && <CustomerDropdown onClose={toggleDropdown}/>}
                    </div>
                    <Cart/>
                </div>
            </div>
        </div>
    );
}

export default Header;
