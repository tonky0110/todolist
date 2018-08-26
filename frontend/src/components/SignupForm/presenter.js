import React from "react";
import PropTypes from "prop-types";
// import Ionicon from "react-ionicons";
import FacebookLogin from "react-facebook-login";
import formStyles from "components/shared/formStyles.scss";

const SignupForm = props => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {"Sign up to control Todo List."}
    </h3>
    <FacebookLogin
        appId="336918743719235"
      autoLoad={false}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.facebookLink}
      icon="fa-facebook-official"
      textButton={"Log in with Facebook"}
    />
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
        <input
            type="email"
            placeholder={"Email"}
            className={formStyles.textInput}
            value={props.emailValue}
            onChange={props.handleInputChange}
            name="email"
        />
        <input
            type="text"
            placeholder={"name"}
            className={formStyles.textInput}
            value={props.nameValue}
            onChange={props.handleInputChange}
            name="name"
        />
        <input
            type="text"
            placeholder={"username"}
            className={formStyles.textInput}
            value={props.usernameValue}
            onChange={props.handleInputChange}
            name="username"
        />
        <input
            type="password"
            placeholder={"password"}
            className={formStyles.textInput}
            value={props.passwordValue}
            onChange={props.handleInputChange}
            name="password"
        />
    </form>
  </div>
);
SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired
};
export default SignupForm;
