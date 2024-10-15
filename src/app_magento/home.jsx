import React from 'react';
import Header from './layout/header'
import Footer from './layout/footer'
import ListProduct from "./product/list";
import Banner from './layout/banner'

function Home() {
    return (
        <div>
            <Header/>
            <Banner/>
            <ListProduct/>
            <Footer/>
        </div>
    );
}

export default Home;
