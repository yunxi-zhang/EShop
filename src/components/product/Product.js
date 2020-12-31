import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ProductDetail from './ProductDetail';
import ProductId from './ProductId';
import ProductType from './ProductType';
import LoadingBar from "../loading/Loading";
require('dotenv').config();
let getProductDetailAPI;
let updateProductBalanceAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getProductDetailAPI = process.env.REACT_APP_Product_API_HOSTNAME + ':' + process.env.REACT_APP_Product_API_PORT + '/Product/Detail?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
  updateProductBalanceAPI = process.env.REACT_APP_Product_API_HOSTNAME + ':' + process.env.REACT_APP_Product_API_PORT + '/Product/updateBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
} else {
  getProductDetailAPI = process.env.REACT_APP_Product_API_HOSTNAME + ':' + process.env.REACT_APP_Product_API_PORT + '/product/list';
  updateProductBalanceAPI = process.env.REACT_APP_Product_API_HOSTNAME + ':' + process.env.REACT_APP_Product_API_PORT + '/updateBalance';
}

const Product = () => {
  const [Products, setProducts] = useState([]);
  const [newProductBalance, setNewProductBalance] = useState(0);
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

  const getNewBalance = (e) => {
    setNewProductBalance(e.target.value);
  }

  const updateBalance = () => {
    setCaller(true);
    axios.post(updateProductBalanceAPI, {
      "key": "ProductBalance",
      "value": newProductBalance
    })
      .then((res) => {
        // call the get api again to get the latest value
        axios.all([
          axios.get(getProductDetailAPI),
        ])
          .then((res) => {
            setCaller(false);
            setProducts(res[0].data)
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  return (
    <div>
      {
        Products.map((Product, index) => (
          <Card border="primary" className="text-center">
            <Card.Header as="h3">Product-{index + 1}</Card.Header>
            <Card.Body>
              {caller ? (<LoadingBar />) : (
                <div>
                  <Card.Title><b>Id:</b><ProductId Product={Product} /></Card.Title>
                  <Card.Title><b>Total Detail:</b><ProductDetail Product={Product} /></Card.Title>
                  <Card.Title><b>Type:</b><ProductType Product={Product} /></Card.Title>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      }
    </div>
  );
}

export default Product;