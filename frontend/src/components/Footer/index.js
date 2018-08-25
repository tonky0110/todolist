import React from 'react';
import styels from './styles.scss';

const Footer = props => (
  <footer className={styels.footer}>
    <div className={styels.column}>
        <nav className={styels.nav}>
            <ul className={styels.list}>
                <li className={styels.listItem}>1</li>
                <li className={styels.listItem}>2</li>
                <li className={styels.listItem}>3</li>
            </ul>
        </nav>
    </div>
  </footer>
);

export default Footer;