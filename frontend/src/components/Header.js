import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logoutAction } from "../actions/userActions";
import Searchbox from "./Searchbox";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            {" "}
            <Navbar.Brand>Ecommerce</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <Searchbox history={history} />} />
            <Nav className="ml-auto">
              <Link className="text-white" to="/cart">
                {" "}
                <i className="fas fa-shopping-cart"></i>{" "}
                {cartItems.length > 0 && (
                  <span className="badge"> {cartItems.length} </span>
                )}
              </Link>

              {/* <Link to="/login">
                <i className="fas fa-user"></i> Sign In
              </Link>
               */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link to="/profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <NavDropdown.Item>
                    <Link
                      to="/register"
                      style={{ color: "white" }}
                      className="nav-header-link"
                    >
                      <i className="fas fa-user text-white"></i> Sign Up
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/login" className="text-white nav-header-link">
                      <i className="fas fa-user text-white"></i> Sign In
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/productlist">Products</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/orderlist">Orders</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
