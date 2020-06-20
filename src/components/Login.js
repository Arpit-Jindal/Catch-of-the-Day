import React from "react";
import PropTypes from "prop-types";
const Login = (props) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>
      Sign in to manage <strong>{props.storeId}</strong> store's Inventory.
    </p>

    <button
      className="github"
      onClick={() => {
        props.authenticate("Github");
      }}
    >
      Log In with GitHub
    </button>
    <button
      className="facebook"
      onClick={() => {
        props.authenticate("Facebook");
      }}
    >
      Log In with Facebook
    </button>
    <p>Hack: You'll become the owner of this store if there's no Owner!!</p>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
};

export default Login;
