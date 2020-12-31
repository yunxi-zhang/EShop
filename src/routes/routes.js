import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from '../components/welcome/Welcome';
import Product from '../components/product/Product';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function Routing() {
  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">EShop-Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Product">Product</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/product" component={Product} />
        </div>
      </Router>
    </div>
  )
}

export default Routing;