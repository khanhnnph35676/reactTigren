import React from 'react';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content container">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        We are Tigren Solutions, a leading e-commerce solution provider, offering high-quality Magento
                        development services.
                    </p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: info@tigren.com</p>
                    <p>Phone: +84 123 456 789</p>
                    <p>Address: 123 Tigren Street, Vietnam</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Tigren Solutions | All Rights Reserved
            </div>
        </div>

    );
}

export default Footer;
