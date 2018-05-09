import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../assets/sass/Dashboard.module.scss';

const Dashboard = () => (
	<div className={ styles.col_12_of_12 }>
		<h1>Dashboard</h1>
		{/* added to test google OAuth -- Delete later */}
		<a href="/auth/google">Log in With Google</a>
		<Link to='/project/1'>Project 1</Link>
	</div>
);

export default Dashboard;