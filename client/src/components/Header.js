import React from 'react';
import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/Header.module.scss';

const Header = () => (
	<header className={ styles.App_header }>
    <img src={ logo } className={ styles.App_logo } alt="logo" />
    <h1 className={ styles.App_title }>Welcome to Willow?</h1>
  </header>
);

export default Header;