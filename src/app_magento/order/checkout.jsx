import React, {useEffect, useState} from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
// import '../css/style.css'
import {BASE_URL} from '../link';
import axios from 'axios';

const Checkout = () => {
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tokenData = localStorage.getItem('customerToken');
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const URL = BASE_URL + '/graphql';
    useEffect(() => {
        const fetchCustomerData = async () => {
            const query = `
                query {
                    customer {
                        id
                        firstname
                        lastname
                        email
                        addresses {
                            id
                            street
                            city
                            postcode
                            country_code
                            telephone
                        }
                    }
                }
            `;

            try {
                const response = await axios.post(URL, {
                    query
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 1000
                });

                setCustomerData(response.data.data.customer);
                setLoading(false);

            } catch (error) {
                setError('Failed to fetch customer data');
                setLoading(false);
            }
        };
        console.log(customerData)
        fetchCustomerData();
    }, [token]);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện hành động thanh toán
        console.log('Form Submitted');
    };
    return (
        <>
            <Header/>
            <div className="checkout-container container">
                <h1>Checkout</h1>
                <form className="checkout-form" onSubmit={handleSubmit}>
                    {/* Thông tin giao hàng */}
                    <div className="form-section border">
                        <h2>Shipping Information</h2>
                        <div className="form-group">

                            <label htmlFor="name">First Name</label>
                            <input type="text" id="firstname" name="name"
                                // value={customerData.firstname}
                                   placeholder="Enter your first name"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Last Name</label>
                            <input type="text" id="lastname" name="name"
                                // value={customerData.lastname}
                                   placeholder="Enter your last name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="street" name="street" placeholder="Enter your address" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Country</label>
                            <input type="tel" id="country_code" name="country_code"
                                   placeholder="Enter your country"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">City</label>
                            <input type="tel" id="country_code" name="country_code"
                                   placeholder="Enter your Ctyt"
                                   required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="telephone" name="telephone" placeholder="Enter your phone number"
                                   required/>
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="form-method border">
                        <h2>Payment Methods</h2>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit-card"
                                    checked={paymentMethod === 'credit-card'}
                                    onChange={() => setPaymentMethod('credit-card')}
                                />
                                Credit Card
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                />
                                PayPal
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                Cash on Delivery
                            </label>
                        </div>

                        <button type="submit" className="checkout-btn">Complete Payment</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default Checkout;
