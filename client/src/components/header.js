import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/header.css";
import logo from "../assets/images/logo.png";

function Header() {
  // Assume this isLoggedIn state would actually come from your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const isLoggedIn = useAuth()

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="row w-100">
          <div className="col-lg-4">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          <div className="col-lg-4 text-center d-none d-lg-block">
            <h1 className="navbar-title">Local Harvest</h1>
          </div>
          <div className="col-lg-4">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/home">
                    Locate
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">
                        | Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
