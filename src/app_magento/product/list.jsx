import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/product.css';
import axios from 'axios';
import {BASE_URL} from '../link';

function ListProduct() {
    const [products, setProducts] = useState([]); // Khởi tạo state cho sản phẩm
    const [error, setError] = useState('');
    const URL = BASE_URL + '/graphql';
    useEffect(() => {
        // Hàm lấy sản phẩm từ API
        const fetchProducts = async () => {
            const query = `
                {
                    products(filter: { sku: { eq: "" } }, pageSize: 10, currentPage: 1) {
                        items {
                            id
                            name
                            sku
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                        currency
                                    }
                                }
                                maximum_price {
                                    regular_price {
                                        value
                                        currency
                                    }
                                }
                            }
                            image {
                                url
                                label
                            }
                            description {
                                html
                            }
                            stock_status
                            url_key
                            type_id
                        }
                    }
                }
            `;
            try {
                const response = await axios.post(URL, {
                    query: query
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProducts(response.data.data.products.items)// Lưu danh sách sản phẩm vào state
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products.'); // Ghi lỗi vào state
            }
        };

        fetchProducts(); // Gọi hàm khi component được render
    }, []);
    return (
        <div className="product-list container">
            <h1>Our Products</h1>
            {error && <p style={{color: 'red'}}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="wrapper-img">
                            <Link to='/productDetail'>
                                <img src={product.image.url} alt={product.name} className="product-image"/>
                            </Link>
                        </div>
                        <div className="wrapper-content">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">Price:
                                ${product.price_range.minimum_price.regular_price.value}</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
