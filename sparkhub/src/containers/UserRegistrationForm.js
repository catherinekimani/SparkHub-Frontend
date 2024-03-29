import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signup } from "../actions/auth";

import "../styles/UserRegistrationForm.css";

const UserRegistrationForm = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(name, email, password, re_password);
      setAccountCreated(true);
      
    }
  };

  // redirect to homepage
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;

  }
  return (
    <div className="registration-container">
      <div className="heading-container">
        <h1 className="heading">Welcome to SparkHub</h1>
        <p className="sub-heading">Create your Account</p>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name*"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        {/* password */}
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            value={re_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>

        <button className="btn-register" type="submit"> Register </button>
      </form>

      <p className="mt-3"> {" "} Already have an account <Link to="/login">Sign In</Link> </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(UserRegistrationForm);
