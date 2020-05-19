import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
  return <p>Home</p>;
}

function Products() {
  return <p>Products</p>;
}

function Taxes() {
  return <p>Taxes</p>;
}

function AppRouter() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Router>
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/" className="mr-auto">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/products">
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/taxes">
                  Taxes
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/taxes">
            <Taxes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;
