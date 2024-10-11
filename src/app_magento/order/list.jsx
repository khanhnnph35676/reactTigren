import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../layout/header';
import Footer from '../layout/footer';
import '../css/order.css';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createSampleData = () => {
        return [
            {id: 1, customerName: 'Nguyễn Văn A', total: 150.00, status: 'Đã giao'},
            {id: 2, customerName: 'Trần Thị B', total: 200.50, status: 'Đang xử lý'},
            {id: 3, customerName: 'Lê Văn C', total: 120.75, status: 'Đã giao'},
            {id: 4, customerName: 'Phạm Thị D', total: 95.00, status: 'Đã hủy'},
        ];
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Thay thế API call bằng dữ liệu mẫu
                // const response = await axios.get('http://magento246.com/rest/V1/integration/customer/token');
                const sampleData = createSampleData(); // Gọi hàm tạo dữ liệu mẫu
                setOrders(sampleData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header/>

            <div className="container">
                <h1 className='headeLine'>Lịch sử đơn hàng</h1>
                <ul className='list-order'>
                    {orders.map(order => (
                        <li key={order.id}>
                            <a href="" className='content-order'>
                                <h5>Đơn hàng #{order.id}</h5>
                                <p>Ngày đặt: {new Date(order.date).toLocaleDateString()}</p>
                                <p>Tổng: {order.total} VND</p>
                                <p>Trạng thái: {order.status}</p>
                                <p className="order-actions">
                                    <i className="fa fa-edit" aria-hidden="true" title="Chỉnh sửa"></i>
                                    <i className="fa fa-trash" aria-hidden="true" title="Xóa"></i>
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </div>
    );
};

export default ListOrder;