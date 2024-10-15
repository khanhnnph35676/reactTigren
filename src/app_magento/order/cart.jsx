import React, {useEffect, useState} from 'react';
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
    const tokenData = localStorage.getItem('customerToken');
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const handleDelete = async (id) => {
        const deleteCartMutation = `mutation {
            removeItemFromCart(
              input: {
                cart_id: "${cartId}"
                cart_item_id: ${id}
              }
            ) {
              cart {
                items {
                  id
                }
              }
            }
          }`;
        console.log(cartId)
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                // Gửi mutation lên API GraphQL
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Token truy cập của người dùng (nếu có)
                    },
                    body: JSON.stringify({
                        query: deleteCartMutation
                    })
                });

                const result = await response.json();

                if (result.data) {
                    // Nếu xóa thành công, cập nhật lại giỏ hàng
                    const updatedCart = cartItems.filter(item => item.id !== id);
                    setCartItems(updatedCart);
                    console.log('Item deleted successfully');
                } else {
                    console.error('Failed to delete the item:', result.errors);
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
    };
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
                    id
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
                localStorage.setItem('cartId', cartIdFromResponse);
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
        <div className="icon cart" onClick={toggleCart}>
            <a href="#">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>({cartItems.length})</span> {/* Cập nhật số lượng giỏ hàng */}
            </a>
            {/*{isCartOpen && <Cart onClose={toggleCart}/>}*/}
            <div className={`cart-list ${isCartOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to='/checkout'>
                            <button className='checkout'>Checkout</button>
                        </Link>
                        <hr/>
                    </li>
                    {cartItems.length > 0 ? (
                        <ul className='content-cart'>
                            {cartItems.map((item, index) => (
                                <li className='content' key={index}>
                                    <Link to='/productDetail'>
                                        <div className="d-flex">
                                            <img src={item.product.image.url} alt={item.product.name} width={70}/>
                                            <div>
                                                <span>{item.product.name} - {item.product.sku}</span>
                                                <br/>
                                                <span><strong>${item.prices.price.value}</strong></span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="qty-container">
                                        <span className="qty-label">Qty:</span>
                                        <div className="d-flex">
                                            <input className="qty-input" type="text" value={item.quantity} readOnly/>
                                            <div className="order-actions">
                                                <a href="#">
                                                    <i className="fa fa-edit" aria-hidden="true" title="Chỉnh sửa"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="fa fa-trash" aria-hidden="true"
                                                       onClick={() => handleDelete(item.id)} title="Xóa"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
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
