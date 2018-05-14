import React from 'react';
import styles from '../assets/sass/Home.module.scss';

// import DisplayModal from '../containers/Modal/DisplayModal';
// import CustomModalContent from '../components/CustomModalContent';
// import BookmarkBody from '../containers/Bookmarks/BookmarkBody';
// const dummyInfo = { level: 'success', header: 'Shit!', text: 'I\'m an error', id: 3 };

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
	</div>
);

export default Home;



// <DisplayModal
// 	type={ 'confirmation' }
// 	id={ 1 }
// />
// <DisplayModal
// 	type={ 'custom' }
// 	body={ <BookmarkBody /> }
// 	id={ 2 }
// />
// <DisplayModal
// 	type={ 'notification' }
// 	level={ 'success' }
// 	action={ dummyInfo }
// />