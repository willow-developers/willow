import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectView from './ProjectView';


const Project = ({ fakeAuth }) => {
	const PrivateRoute = ({ component: Component, ...rest }) => (
		<Route { ...rest } render={(info) =>
			fakeAuth.isAuthenticated
			? (<Component
					{ ...info }
				/>)
			: (<Redirect to={{
					pathname: '/login',
					state: { from: info.location }
				}}/>)
			}
		/>
	);

	return (
		<Switch>
			<PrivateRoute path='/project/:id' component={ ProjectView } /> 
		</Switch>
	);
}

export default Project;