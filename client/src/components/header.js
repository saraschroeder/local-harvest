import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/header.css";
import logo from "../assets/images/logo.png";
import Auth from "../utils/auth";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.isLoggedIn());

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };

  let userProfile;
  if (isLoggedIn) {
    userProfile = Auth.getProfile().data;
    console.log(userProfile);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="navbar-title ml-3">Local Harvest</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="nav-links-right align-items-center">
            <Nav.Link as={Link} to="/">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link
              href="https://donate.stripe.com/test_6oE3ghcIw6zS1k4bII"
              target="_blank"
            >
              Donate
            </Nav.Link>
            <div className="ml-lg-auto">
              {isLoggedIn ? (
                <React.Fragment>
                  <NavDropdown
                    title={`${userProfile.userName}`}
                    id="basic-nav-dropdown"
                    className="header-dropdown"
                  >
                    {userProfile.role === "Farmer" && (
                      <NavDropdown.Item as={Link} to="/create-post">
                        Create Post
                      </NavDropdown.Item>
                    )}
                    {userProfile.role === "Farmer" && (
                    <NavDropdown.Item
                      as={Link}
                      to={`/profile/${userProfile._id}`}
                    >
                      Profile
                    </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-separator">
                  Login
                </Nav.Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
