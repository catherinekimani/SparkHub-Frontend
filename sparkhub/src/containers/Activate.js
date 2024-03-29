import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { verify } from "../actions/auth";

import "../styles/Activate.css";

import activate from "../assets/act.png";

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;


    verify(uid, token);
    setVerified(true);
  };

  // redirect to homepage
  if (verified) {
    return <Redirect to="/" />;
  }

  return (
    <div className="activate-container">
      <img
        src={activate}
        alt="activate"
        className="activate-image"
      />
      <div>
        <h1>Verify your Account</h1>
        <button
          onClick={verify_account}
          type="button"
          className="btn btn-activate"
        >
          {" "}
          Verify{" "}
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
