import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './home';
import Login from './login';
import ListOrder from './order/list'
import 'font-awesome/css/font-awesome.min.css';

function Index() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/listOrder" element={<ListOrder/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default Index;
