import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
//page------------------------------------------
import Home from './home';
import Login from './login';
import ListOrder from './order/list'
import ProductDetail from './product/detail';
import Checkout from './order/checkout'
import ListProducts from './product/listProduct'
// css------------------------------------------
import './css/style.css'
import './css/checkout.css'
import './css/banner.css'
import './css/product.css'
import './css/order.css'

//image-------------------------------------------

function Index() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/productDetail/:sku" element={<ProductDetail/>}/>
                    <Route path="/listOrder" element={<ListOrder/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/listProduct" element={<ListProducts/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default Index;
