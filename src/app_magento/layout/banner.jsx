import React from 'react';
import banner1 from '../img/baner1.webp'
import {Link} from 'react-router-dom';

function Banner() {

    return (
        <>
            <div className="banner-container">
                <div className="background"></div>
                <img
                    src={banner1}
                    alt="Banner"
                    className="banner-image"
                />
                <div className="text-container">
                    <h1 className="title">Welcome to Our Store!</h1>
                    <p className="subtitle">Find the best deals and latest products here</p>
                    <Link to='/listProduct'>
                        <button className="cta-button">Shop Now</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Banner;
