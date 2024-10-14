import React, {useEffect, useState} from 'react';
import logo from '../img/tigren-logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {BASE_URL} from "../link";
import axios from "axios";

function Cart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const URL = BASE_URL + '/graphql';
    const [cartId, setCartId] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const token = localStorage.getItem('customerToken');
    const tokenData = localStorage.getItem('customerToken');

    const token = tokenData ? JSON.parse(tokenData).token : null;

    const toggleCart = (e) => {
        // e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        setIsCartOpen(!isCartOpen); // Đảo ngược trạng thái mở của giỏ hàng
    };
    const cart = `
    mutation {
      createEmptyCart
    }`;

    const query = `
        {
        cart(cart_id: "${cartId}") {
                items {
                  product {
                    name
                    sku
                    image {
                      url
                    }
                  }
                  quantity
                  prices {
                    price {
                      value
                      currency
                    }
                  }
                }
                prices {
                  grand_total {
                    value
                    currency
                  }
                }
              }
            }`;

    useEffect(() => {
        const fetchCartData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const cartIdResponse = await axios.post(URL, {
                    query: cart
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const cartIdFromResponse = cartIdResponse.data.data.createEmptyCart;
                setCartId(cartIdFromResponse);

                const response = await axios.post(URL, {
                    query: query
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const cartData = response.data.data.cart;
                setCartItems(cartData.items);
                setGrandTotal(cartData.prices.grand_total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [token, cartId]);

    return (
        <div className="icon" onClick={toggleCart}>
            <a href="#">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>({cartItems.length})</span> {/* Cập nhật số lượng giỏ hàng */}
            </a>
            <div className={`cart-list ${isCartOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <a href=''>
                            <button className='checkout'>Checkout</button>
                        </a>
                        <hr/>
                    </li>
                    {cartItems.length > 0 ? (
                        <ul className='content-cart'>
                            {cartItems.map((item, index) => (
                                <li className='content' key={index}>
                                    <div className="d-flex">
                                        <img src={item.product.image.url} alt={item.product.name} width={70}/>
                                        <span>{item.product.name} - {item.product.sku}</span>
                                    </div>
                                    <p><strong>${item.prices.price.value}</strong></p>
                                    <p className="qty-container">
                                        <span className="qty-label">Qty:</span>
                                        <input className="qty-input" type="text" value={item.quantity} readOnly/>
                                    </p>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items in the cart.</p>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default Cart;
