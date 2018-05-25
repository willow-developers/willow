import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from '../assets/sass/Home.module.scss';

class Home extends Component {

	render() {
		// if the user is authenticated --> redirect
		if (this.props.userStatus) {
			return (
				<Redirect to={{ pathname:'/dashboard'}}/>
			);

			// else: render regular home page
		} else {
			return (
				<div className={ styles.col_12_of_12 }>
					<div className={ styles.mainMessage }>
						<p className={ styles.intro }>Welcome to</p>
						<h1>Willow</h1>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	userStatus: state.userStatus
});

export default connect(mapStateToProps, null)(Home);