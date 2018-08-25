import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import formStyles from "components/shared/formStyles.scss";

const SignupForm = props => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {"Sign up to see photos and videos from you friends."}
    </h3>
    <button className={formStyles.button}>
        <Ionicon icon="logo-facebook" fontSize="20px" color="white" />
        {"Log in with Facebook"}
    </button>
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form}>
        <input
            type="email"
            placeholder={"Email"}
            className={formStyles.textInput}
        />
        <input
            type="text"
            placeholder={"name"}
            className={formStyles.textInput}
        />
        <input
            type="text"
            placeholder={"username"}
            className={formStyles.textInput}
        />
        <input
            type="password"
            placeholder={"password"}
            className={formStyles.textInput}
        />
    </form>
  </div>
);

export default SignupForm;
