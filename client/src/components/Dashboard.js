import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../assets/sass/Dashboard.module.scss';

const Dashboard = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Dashboard</h1>
		<Link to='/project/1'>Project 1</Link>
	</div>
);

export default Dashboard;