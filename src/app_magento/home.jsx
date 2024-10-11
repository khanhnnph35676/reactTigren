import React from 'react';
import './css/style.css'
import Header from './layout/header'
import Footer from './layout/footer'
import ListProduct from "./product/list";


function Home() {
    return (
        <div>
            <Header/>
            <ListProduct/>
            <Footer/>
        </div>
    );
}

export default Home;
