import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectView from './ProjectView';

class Project extends Component {
	render() {
		const PrivateRoute = ({ component: Component, ...rest }) => {
			return (
				<Route { ...rest } render={(info) =>
					!!this.props.userStatus
					? (<Component { ...info } />)
					: (<Redirect to={{
							pathname: '/login',
							state: { from: info.location }
						}}/>)
					}
				/>
			);
		};

		return (
			<Switch>
				<PrivateRoute path='/project/:id' component={ ProjectView } /> 
			</Switch>
		);
	}
}

const mapStateToProps = (state) => {
  return { userStatus: state.userStatus };
};

export default withRouter(connect(mapStateToProps)(Project));