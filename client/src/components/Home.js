import React from 'react';
import styles from '../assets/sass/Home.module.scss';

import DisplayModal from '../containers/Modal/DisplayModal';
// import CustomModalContent from '../components/CustomModalContent';
import BookmarkBody from '../containers/Bookmarks/BookmarkBody';
import NewProject from '../containers/NewProjectBuilder/NewProject';

const dummyInfo = { level: 'success', header: 'Shit!', text: 'I\'m an error', id: 3 };

const Home = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Welcome to the Willow!</h1>
		<DisplayModal
			type={ 'confirmation' }
			id={ 1 }
		/>
		<DisplayModal
			type={ 'custom' }
			body={ <BookmarkBody /> }
			id={ 2 }
			icon={ 'add' }
			value={ 'Add bookmark' }
		/>
		<DisplayModal
			type={ 'notification' }
			level={ 'success' }
			action={ dummyInfo }
		/>
		<DisplayModal
			type={ 'custom' }
			body={ <NewProject /> }
			id={ 3 }
			icon={ 'create' }
			value={ 'Create New Project' }
		/>
	</div>
);

export default Home;