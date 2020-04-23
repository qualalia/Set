import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Modal, Button, Header, Divider, Table } from "semantic-ui-react";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error, open } = props;
  const [isOpen, toggleOpen] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    toggleOpen(false);
    history.push("/solo");
  };
  useEffect(() => {
    toggleOpen(open);
  }, []);

  return (
    <Modal
      id="login-or-signup"
      open={isOpen}
      onClose={handleClose}
      size="mini"
      centered={false}
      basic
    >
      <Modal.Content>
        <form className="auth-form" onSubmit={handleSubmit} name={name}>
          <div id="login-form">
            <div className="auth-form-div">
              <label htmlFor="email">Email</label>
              <input name="email" type="text" />
            </div>
            <div className="auth-form-div">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" />
            </div>
            <div id="auth-msg">
              {error && error.response && error.response.data}{" "}
            </div>
            <div id="auth-submit">
              <button type="submit">{displayName}</button>
            </div>
          </div>
        </form>
        <div className="auth-links">
          <a href="/auth/google">{displayName} with Google</a>
          {displayName === "Log in" ? (
            <a href="/signup">Sign up</a>
          ) : (
            <a href="/login">Log in</a>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Log in",
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign up",
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
