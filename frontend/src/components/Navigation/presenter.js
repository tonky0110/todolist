import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import { Link } from "react-router-dom";
import styles from "./styles.scss";




const Navigation = props => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={"Logo"}
          />
        </Link>
      </div>
      <div className={styles.column}>
        <form onSubmit={props.onSubmit}>
          <input
            type="text"
            placeholder={"search"}
            className={styles.searchInput}
            value={props.value}
            onChange={props.onInputChange}
          />
        </form>
      </div>
      <div className={styles.column}>
        <div className={styles.navIcon}>
            <Link to="/addTodo">
                <Ionicon icon="ios-clipboard-outline" fontSize="28px" color="black" />
            </Link>
        </div>
        <div className={styles.navIcon}>
          <Link to="/" onClick={props.handleLogout}>
                <Ionicon icon="ios-log-out" fontsize="32px" color="black" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);


Navigation.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
export default Navigation;