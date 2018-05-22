import React from 'react';
import styles from '../assets/sass/Home.module.scss';

import DisplayModal from '../containers/Modal_NEW/DisplayModal';
import ExplorativeNode from '../containers/ExplorativeNode';

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
		<DisplayModal
			value={ 'Open Explorative' }
			id={ 1 }
			content={ <ExplorativeNode /> }
		/>
	</div>
);


export default Home;