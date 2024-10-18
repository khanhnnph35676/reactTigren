import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../link';

function ListProduct() {
    const [products, setProducts] = useState([]); // Khởi tạo state cho sản phẩm
    const [error, setError] = useState('');
    const URL = BASE_URL + '/graphql';
    const navigate = useNavigate();
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
    const handleAddToCart = async (sku, quantity = 1) => {
        const cartId = localStorage.getItem('cartId');
        const tokenData = localStorage.getItem('customerToken');
        const token = tokenData ? JSON.parse(tokenData).token : null;
        console.log(cartId)
        const mutation = `
            mutation {
              addSimpleProductsToCart(
                input: {
                  cart_id: "${cartId}"
                  cart_items: [
                    {
                      data: {
                        sku: "${sku}",
                        quantity: ${quantity}
                      }
                    }
                  ]
                }
              ) {
                cart {
                  items {
                    id
                    product {
                      name
                      sku
                    }
                    quantity
                  }
                }
              }
            }
          `;
        if (window.confirm('Are you sure you want to add to cart?')) {
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Token của người dùng (nếu cần)
                    },
                    body: JSON.stringify({
                        query: mutation,
                    }),
                });
                const result = await response.json();
                if (result.data) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1);
                } else {
                    console.error('Failed to add product to cart:', result.errors);
                }
            } catch (error) {
                console.error('Error during Add to Cart:', error);
            }
        }
    };

    const handleDetaiPro = (sku) => {
        // const encodedSku = encodeURIComponent(sku);
        // console.log(`/productDetail/${encodedSku}`);
        navigate(`/productDetail/${sku}`);
    }
    return (
        <div className="product-page container">
            {error && <p style={{color: 'red'}}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">

                        <div className="wrapper-img">
                            <span onClick={() => handleDetaiPro(product.sku)}>
                                <img src={product.image.url} alt={product.name} className="product-image"/>
                            </span>
                        </div>
                        <div className="wrapper-content">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">Price:
                                ${product.price_range.minimum_price.regular_price.value}</p>
                            <button className="product-button" onClick={() => handleAddToCart(product.sku)}>Add to
                                Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
