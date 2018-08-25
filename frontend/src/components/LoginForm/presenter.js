import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from "react-ionicons";
import formStyles from "components/shared/formStyles.scss";

const LoginForm = props => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form}>
        <input 
            type="text" 
            placecholder={"username"} 
            className={formStyles.textInput}
        />
        <input 
            type="password" 
            placecholder={"password"} 
            className={formStyles.textInput}
        />
        <input 
            type="submit" 
            value={"Log in"} 
            className={formStyles.button}     
        />
    </form>
    <span className={formStyles.divider}>{" or "}</span>
    <span className={formStyles.facebookLink}>
        <Ionicon icon='logo-facebook' fontSize="20px" color="#385185" />{"  "}
        {"Log in with Facebook"}
    </span>
    <span className={formStyles.forgotLin}>{"Forgot password?"}</span>
  </div>
);

export default LoginForm;