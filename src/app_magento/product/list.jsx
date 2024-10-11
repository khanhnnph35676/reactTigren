import React from 'react';
import logo from '../img/tigren-logo.png';
import '../css/product.css';

function ListProduct() {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            price: '10',
            description: 'This is product 1',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            name: 'Product 2',
            price: '20',
            description: 'This is product 2',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            name: 'Product 3',
            price: '30',
            description: 'This is product 3',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 4,
            name: 'Product 4',
            price: '40',
            description: 'This is product 4',
            image: 'https://via.placeholder.com/150'
        },
    ];
    return (
        <div className="product-list container">
            <h1>Our Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="wrapper-img">
                            <a href="#"> <img src={logo} alt={product.name} className="product-image"/></a>
                        </div>
                        <div className="wrapper-content">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">Price: ${product.price}</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
