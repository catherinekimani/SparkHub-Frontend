import React, { Fragment } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { logout } from '../actions/auth'
import { connect } from "react-redux";

const Navbar = ({ logout, isAuthenticated, user }) => {
  const guestLinks = () => (
    <Fragment>
      <li className="navbar-item">
        {" "}
        <Link to={"/login"}>Login</Link>{" "}
      </li>
      <li className="navbar-item">
        {" "}
        <Link to={"/register"}>Sign Up</Link>{" "}
      </li>
    </Fragment>
  );
  const authLinks = () => (
    <Fragment>
      <li className="navbar-item"> {user && <span>Hi {user.name}</span>} </li>
      <li className="navbar-item">
        <a href="#!" onClick={logout}>
          {" "}
          Logout
        </a>{" "}
      </li>
    </Fragment>
  );
  return (
    <div>
      <div class="wrapper">
        <div class="searchBar">
          <input
            id="searchQueryInput"
            type="text"
            name="searchQueryInput"
            placeholder="Search"
            value=""
          />
          <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path
                fill="#666666"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav className="navbar">
        <div className="top-nav">
          <Link to="/" className="logo">
            SparkHub
          </Link>
        </div>
        <div className="bottom-nav">
          <ul className="nav-links">
            <li className="navbar-item">
              <Link to="/explore/Tech">Tech</Link>
            </li>
            <li className="navbar-item">
              <Link to="/explore/Fashion">Fashion</Link>
            </li>
            <li className="navbar-item">
              <Link to="/explore/Food">Food and Cooking</Link>
            </li>
            <li className="navbar-item">
              <Link to="/explore/Art & Design">Art & Design</Link>
            </li>
            <li className="navbar-item">
              <Link to="/explore/Health & Wellness">Health & Wellness</Link>
            </li>

            <li className="navbar-item">
              <Link to="/explore">Explore Content</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create">Create Content</Link>
            </li>
            <li className="navbar-item profile">
              <i className="fas fa-user"></i>
            </li>
          </ul>
        </div>
        <ul className="navbar-menu">
          {isAuthenticated ? authLinks() : guestLinks()}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {logout})(Navbar);
