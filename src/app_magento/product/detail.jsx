import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import axios from "axios";
import {BASE_URL} from '../link';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const {sku} = useParams();
    const URL = BASE_URL + '/graphql';
    console.log(sku);
    const fetchProductDetail = async () => {
        const query = `
                {
              products(filter: { sku: { eq: "${sku}" }}) {
                items {
                  id
                  name
                  description {
                    html
                  }
                  image {
                    url
                  }
                  price_range {
                    minimum_price {
                      regular_price {
                        value
                        currency
                      }
                    }
                  }
                }
              }
            }
    `;
        const response = await axios.post(URL, {query});
        const productData = response.data.data.products.items[0];
        setProduct(productData);
        console.log(productData)
        // console.log(sku)
        // const productData = response.data.products.items[0];
        // setProduct(productData);
    }
    useEffect(() => {
        fetchProductDetail();
    }, [sku]);
    return (
        <div>
            <Header/>
            <div className="container">
                {product && (
                    <div className="product-container">
                        <div className="product-image">
                            <img src={product.image.url} alt={product.name}/>
                        </div>
                        <div className="product-info">
                            <h1 className='name-product'>{product.name}</h1>
                            <p className="product-price">{product.price_range.minimum_price.regular_price.value.toLocaleString()} VND</p>
                            <p>Qty: <input type="number" defaultValue={1} min={1}/></p>
                            <p className="product-description"
                               dangerouslySetInnerHTML={{__html: product.description.html}}/>
                            <button className="add-to-cart">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default ProductDetail;
