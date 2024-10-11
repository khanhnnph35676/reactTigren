import React, {useState} from 'react';
import logo from '../img/tigren-logo.png';
import {Link} from 'react-router-dom';

const CustomerDropdown = ({onClose}) => {
    const token = localStorage.getItem('customerToken');
    return (
        <div className="customer-dropdown">
            <ul>
                {!token ? (
                    <>
                        <li>
                            <Link to="/login">
                                <i className="fa fa-sign-in" aria-hidden="true"></i> {/* Icon cho đăng nhập */}
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/listOrder">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i> {/* Icon cho đơn hàng */}
                                Orders
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <i className="fa fa-sign-in" aria-hidden="true"></i> {/* Icon cho đăng nhập */}
                                Login
                            </Link>
                        </li>
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
                            <a href="#" onClick={onClose}>
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
                    <a href="#" className="icon"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Header;
