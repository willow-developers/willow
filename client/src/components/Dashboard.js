import React from 'react';
import { Link } from 'react-router-dom';
import DisplayModal from '../containers/Modal_NEW/DisplayModal';
import BookmarkBody from '../containers/Bookmarks/BookmarkBody';
import styles from '../assets/sass/Dashboard.module.scss';

const Dashboard = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Dashboard</h1>
		<Link to='/project/1'>Project 1</Link>
		<br/>
		<br/>
		<br/>
		<DisplayModal
			value={ 'I\'m an Exploratory Node'}
			content={ <BookmarkBody /> }
			name={ 'BookmarkBody' }
			id={ 2 }
		/>
	</div>
);

export default Dashboard;