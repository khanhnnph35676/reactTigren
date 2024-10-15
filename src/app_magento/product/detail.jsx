import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import {useNavigate} from 'react-router-dom';

function ProductDetail() {
    const product = {
        id: 1,
        name: 'Sản phẩm mẫu',
        price: 250000,
        description: 'Đây là mô tả chi tiết cho sản phẩm mẫu.',
        imageUrl: 'https://via.placeholder.com/300', // Thay bằng URL hình ảnh thật
        category: 'Thời trang',
    };
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="product-container ">
                    <div className="product-image">
                        <img src={product.imageUrl} alt={product.name}/>
                    </div>
                    <div className="product-info">
                        <h1 className='name-product'>{product.name}</h1>
                        <p className="product-price">{product.price.toLocaleString()} VND</p>
                        <p>Qty: <input type="number"/></p>
                        <p className="product-description">{product.description}</p>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProductDetail;
