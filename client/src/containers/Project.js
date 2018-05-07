import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectView from './ProjectView';

class Project extends Component {
	render() {
		let isLoggedIn = !!this.props.userStatus;

		const PrivateRoute = ({ component: Component, ...rest }) => {
			return (
				<Route { ...rest } render={(info) =>
					isLoggedIn
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


// const Project = ({ fakeAuth }) => {
// 	const PrivateRoute = ({ component: Component, ...rest }) => (
// 		<Route { ...rest } render={(info) =>
// 			fakeAuth.isAuthenticated
// 			? (<Component
// 					{ ...info }
// 				/>)
// 			: (<Redirect to={{
// 					pathname: '/login',
// 					state: { from: info.location }
// 				}}/>)
// 			}
// 		/>
// 	);

// 	return (
// 		<Switch>
// 			<PrivateRoute path='/project/:id' component={ ProjectView } /> 
// 		</Switch>
// 	);
// }

const mapStateToProps = (state) => {
  return { userStatus: state.userStatus };
};

export default connect(mapStateToProps)(Project);

// export default Project;