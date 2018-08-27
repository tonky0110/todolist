import React from "react";
import styles from "./styles.scss";

const Footer = props => {
  const { todo } = props;
  console.log( "Footer.todo.length: ", todo.length);
  return (
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
};

const renderPage = ( todo ) => {
  return null;
}

export default Footer;
