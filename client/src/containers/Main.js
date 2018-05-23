import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Project from './Project';

import styles from '../assets/sass/Main.module.scss';

class Main extends Component {
	render() {
		const PrivateRoute = ({ component: Component, ...rest }) => {
			return (
				<Route { ...rest } render={(info) =>
					!!this.props.userStatus
					? (<Component { ...info } />)
					: (<Redirect to={{
							pathname: '/',
							state: { from: info.location }
						}}/>)
					}
				/>
			);
		};
		const MainRoute = ({ component: Component, ...rest }) => (
			<Route { ...rest } render={(info) => <Component { ...info } />} />
		);

		return (
			<main className={ styles.grid }>
				<div className={ styles.row }>
					<Switch>
						<PrivateRoute path='/dashboard' component={ Dashboard } />
						<PrivateRoute path='/project' component={ Project } />
						<MainRoute exact path='/' component={ Home } />
					</Switch>
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => ({ userStatus: state.userStatus });

export default withRouter(connect(mapStateToProps)(Main));