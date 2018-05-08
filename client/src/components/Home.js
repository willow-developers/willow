import React from 'react';
import styles from '../assets/sass/Home.module.scss';

import DisplayModal from './Modal/DisplayModal';

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
		<DisplayModal />
	</div>
);

export default Home;