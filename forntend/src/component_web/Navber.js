import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
// import './navber.css'

function Navber() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="header_section text">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" href="index.html">
              <span>ServEase</span>
            </Link>

            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class=""> </span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Serves">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/price">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
              <div className="quote_btn-container">
                <form className="form-inline">
                  {/* <button className="btn   nav_search-btn" type="submit">
                    <i className="fLink fa-search" aria-hidden="true"></i>
                  </button> */}
                </form>
                {location.pathname !== "/Login" &&
                  (auth.user ? (
                    <Link
                      className="btn btn-info"
                      to={"/"}
                      onClick={handleLogout}
                    >
                      Logout ({auth.user.fName})
                    </Link>
                  ) : (
                    <Link to="/Login">
                      <button className="btn btn-info">Log in</button>
                    </Link>
                  ))}
                {}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navber;
