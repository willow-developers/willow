import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { Redirect } from 'react-router-dom';

import Button from '../components/UI/Button';

class Login extends Component {

	loginMessage = (path) => (
		path === '/login'
		? ( <div>
					<p>Welcome back, please login.</p>
				</div> )
		: ( <div>
					<p>Sorry, you must log in to view the { path.substr(1) } page.</p> 
				</div>
		)
	);

	loginRedirect = (start) => (
		start.pathname === '/login'
		? (<Redirect to={'/'} />)
		: (<Redirect to={ start } />)
	);

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/login' } };
		const redirectToReferrer = this.props.userStatus;

		return (
			redirectToReferrer
				? (this.loginRedirect(from))
				: (
					<div>
						{ this.loginMessage(from.pathname) }
						<a href="http://localhost:3000/auth/google">
							<Button
								value={ 'Login With Google' }
								icon={ 'account_circle' }
								type={ 'small' }
								iconSide={ 'left' }
							/>
						</a>
					</div>
				)
		);
	}
};

const mapStateToProps = (state) => ({ userStatus: state.userStatus });

const mapDispatchToProps = (dispatch) => ({ userCheckStatus: (url) => dispatch(userCheckStatus(url)) });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
