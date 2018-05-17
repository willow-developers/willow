import React from 'react';
import styles from '../assets/sass/Home.module.scss';

// import CustomModalContent from '../components/CustomModalContent';
import DisplayModal from '../containers/Modal/DisplayModal';
import BookmarkBody from '../containers/Bookmarks/BookmarkBody';
import NewProject from '../containers/NewProjectBuilder/NewProject';

const dummyInfo = { level: 'success', header: 'Shit!', text: 'I\'m an error', id: 3 };

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
		{/* DisplayModals on GitHub if needed */}
	</div>
);

export default Home;