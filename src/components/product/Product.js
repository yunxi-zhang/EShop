import React, { useState, useEffect } from 'react';
import { Card} from 'react-bootstrap';
import axios from 'axios';
import ProductDetail from './ProductDetail';
import ProductId from './ProductId';
import ProductType from './ProductType';
import LoadingBar from "../loading/Loading";
require('dotenv').config();
let getProductDetailAPI;
let updateProductBalanceAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getProductDetailAPI = process.env.REACT_APP_PRODUCT_API_HOSTNAME + ':' + process.env.REACT_APP_PRODUCT_API_PORT + '/Product/Detail?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
  updateProductBalanceAPI = process.env.REACT_APP_PRODUCT_API_HOSTNAME + ':' + process.env.REACT_APP_PRODUCT_API_PORT + '/Product/updateBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
} else {
  getProductDetailAPI = process.env.REACT_APP_PRODUCT_API_HOSTNAME + ':' + process.env.REACT_APP_PRODUCT_API_PORT + '/product/list';
  updateProductBalanceAPI = process.env.REACT_APP_PRODUCT_API_HOSTNAME + ':' + process.env.REACT_APP_PRODUCT_API_PORT + '/updateBalance';
}

const Product = () => {
  const [products, setProducts] = useState([]);
  const [caller, setCaller] = useState(false);

  useEffect(() => {
    axios.all([
      axios.get(getProductDetailAPI),
    ])
      .then((res) => {
        console.log("Products:", res[0].data);
        setProducts(res[0].data)
      })
      .catch(console.log);
  }, []);

  return (
    <div class="row">
      {
        products.map((product, index) => (
          <div class="col-lg-6">
          <Card border="primary" className="text-center" >
            <Card.Header as="h3">Product-{index + 1}</Card.Header>
            <Card.Body>
              {caller ? (<LoadingBar />) : (
                <div>
                  <Card.Title><b>Id:</b><ProductId product={product} /></Card.Title>
                  <Card.Title><b>Total Detail:</b><ProductDetail product={product} /></Card.Title>
                  <Card.Title><b>Type:</b><ProductType product={product} /></Card.Title>
                </div>
              )}
            </Card.Body>
          </Card>
          </div>
        ))
      }
    </div>
  );
}

export default Product;