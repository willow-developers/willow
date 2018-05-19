import React from 'react';
import styles from '../assets/sass/Home.module.scss';

import DisplayModal from '../containers/Modal_NEW/DisplayModal';
import NotesBody from '../containers/Notes/NotesBody';

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
		<DisplayModal
			value={ 'Open your notes!' }
			id={ 1 }
			content={ <NotesBody /> }
		/>
	</div>
);


export default Home;