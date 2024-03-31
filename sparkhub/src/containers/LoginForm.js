import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../actions/auth";
import { showLoginSuccessMessage } from "../actions/auth";

import "../styles/LoginForm.css";

import { FaGoogle, FaFacebook } from "react-icons/fa";

const LoginForm = ({ login, isAuthenticated, showLoginSuccessMessage }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      setShowSuccessMessage(true);
      showLoginSuccessMessage();
      setError(null);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  // redirect to homepage
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <h1 className="heading">Welcome Back to SparkHub!</h1>
      <p className="sub-heading">Sign in to your account</p>
      {error && <div className="error-message">{error}</div>}
      {showSuccessMessage && (
        <div className="success-message">Login successful!</div>
      )}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="8"
            required
          />
        </div>

        <button className="btn btn-login" type="submit">
          {" "}
          Login{" "}
        </button>
      </form>

      <div className="social-buttons mt-3">
        <button className="social-button mr-2">
          {" "}
          <FaGoogle size={20} style={{ marginRight: "10px" }} /> Sign in with
          Google{" "}
        </button>
        <button className="social-button">
          {" "}
          <FaFacebook size={20} style={{ marginRight: "10px" }} /> Sign in with
          Facebook{" "}
        </button>
      </div>

      <p className="text">
        {" "}
        Don't have an account <Link to="/register">Sign Up</Link>{" "}
      </p>
      <p className="text">
        {" "}
        Forgot your password? <Link to="/reset-password">
          Reset Password
        </Link>{" "}
      </p>
    </div>
  );
}; 

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showSuccessMessage: state.auth.showLoginSuccessMessage,
});

export default connect(mapStateToProps, { login, showLoginSuccessMessage })(
  LoginForm
);
