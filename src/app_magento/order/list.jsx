import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../layout/header';
import Footer from '../layout/footer';
import SiderBar from './sider-bar';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../link';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tokenData = localStorage.getItem('customerToken');
    const parsedTokenData = JSON.parse(tokenData);
    const token = parsedTokenData.token;
    const URL = BASE_URL + '/graphql';
    useEffect(() => {
        const query = `{
              customer {
                orders(pageSize: 10, currentPage: 1) {
                  items {
                    id
                    increment_id
                    status
                    created_at
                    total {
                      grand_total {
                        value
                        currency
                      }
                    }
                    items {
                      product_name
                      quantity_ordered
                      product_sale_price {
                        value
                        currency
                      }
                    }
                  }
                  total_count
                  page_info {
                    current_page
                    page_size
                  }
                }
              }
            }`;
        console.log('Token: ', token);
        const fetchOrders = async () => {
            try {
                const response = await axios.post(URL, {
                    query: query
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data.customer);
                console.log(token);
                // In ra dữ liệu phản hồi từ API
                if (!response.data.data || !response.data.data.customer || !response.data.data.customer.orders.items.length) {
                    setError('Không có thông tin đơn hàng.');
                } else {
                    const fetchedOrders = response.data.data.customer.orders.items.map(order => ({
                        id: order.increment_id,
                        date: order.created_at,
                        total: order.total.grand_total.value,
                        currency: order.total.grand_total.currency,
                        status: order.status,
                    }));
                    setOrders(fetchedOrders);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <Header/>
            <div className="container content-user">
                <SiderBar/>

                <div className="content">
                    <h1 className='headeLine'>History Orders</h1>
                    <hr/>
                    <ul className='list-order'>
                        {orders.length === 0 ? (
                            <div>Không có đơn hàng nào</div>
                        ) : (
                            <ul className='list-order'>
                                {orders.map(order => (
                                    <li key={order.id}>
                                        <Link to='#' className='content-order'>
                                            <h5>Đơn hàng #{order.id}</h5>
                                            <p>Ngày đặt: {new Date(order.date).toLocaleDateString()}</p>
                                            <p>Tổng: {order.total} {order.currency}</p>
                                            <p>Trạng thái: {order.status}</p>
                                            <p className="order-actions">
                                                <i className="fa fa-edit" aria-hidden="true" title="Chỉnh sửa"></i>
                                                <i className="fa fa-trash" aria-hidden="true" title="Xóa"></i>
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default ListOrder;