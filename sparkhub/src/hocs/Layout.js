// eslint-disable-next-line

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from '../actions/auth'

// navbar component
import Navbar from "../components/Navbar";

const Layout = (props) => {
	useEffect(() => {
		props.checkAuthenticated();
		props.load_user();
	}, []);
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, {checkAuthenticated, load_user})(Layout);
