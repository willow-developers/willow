import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false
		}
	}

	login = () => {
		this.props.fakeAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true });
		});
	};

	loginMessage = (path) => (
		path === '/login'
		? (<p>Welcome back, please login.</p>)
		: (<p>Sorry, you must log in to view the { path.substr(1) } page.</p>)
	);

	loginRedirect = (start) => (
		start.pathname === '/login'
		? (<Redirect to={'/'} />)
		: (<Redirect to={ start } />)
	);

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/login' } };
		const { redirectToReferrer } = this.state;
		return (
			redirectToReferrer
				? (this.loginRedirect(from))
				: (
					<div>
						{ this.loginMessage(from.pathname) }
						<button onClick={ this.login }>Log in</button>
					</div>
				)
		);
	}
}

export default Login;