import React from 'react';
import PropTypes from 'prop-types';
//import Ionicon from "react-ionicons";
import FacebookLogin from "react-facebook-login";
import formStyles from "components/shared/formStyles.scss";

const LoginForm = props => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        placecholder={"username"}
        className={formStyles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
      />
      <input
        type="password"
        placecholder={"password"}
        className={formStyles.textInput}
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
      />
      <input type="submit" value={"Log in"} className={formStyles.button} />
    </form>
    <span className={formStyles.divider}>{" or "}</span>
    <FacebookLogin
        appId="336918743719235"
      autoLoad={false}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.facebookLink}
      icon="fa-facebook-official"
      textButton={"Log in with Facebook"}
    />
    <span className={formStyles.forgotLin}>{"Forgot password?"}</span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
};

export default LoginForm;