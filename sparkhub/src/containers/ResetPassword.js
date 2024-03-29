import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { reset_password } from "../actions/auth";

import "../styles/ResetPassword.css";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  // redirect to homepage
  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="password-container">
      <img
        src="https://imgs.search.brave.com/q0Od7PWTXNYFhvu5ty8Qokh4SIqPr0bE7MOb7i5vFMg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b21wdXRlci1zZWN1/cml0eS13aXRoLWxv/Z2luLXBhc3N3b3Jk/LXBhZGxvY2tfMTA3/NzkxLTE2MTkxLmpw/Zz9zaXplPTYyNiZl/eHQ9anBn"
        alt="Password Reset"
        className="password-image"
      />
      <h1>Request Password Reset:</h1>
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

        <button className="btn btn-reset" type="submit">
          {" "}
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
