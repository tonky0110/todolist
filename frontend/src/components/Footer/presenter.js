import React from "react";
import styles from "./styles.scss";

const Footer = props => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>1</li>
          <li className={styles.listItem}>2</li>
          <li className={styles.listItem}>3</li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
