import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { Redirect } from 'react-router-dom';


// for testing purposes -- DELETE LATER:
import axios from 'axios';

import Button from '../components/UI/Button';

class Signup extends Component {

	loginRedirect = (start) => (
		start.pathname === '/signup'
		? (<Redirect to={'/'} />)
		: (<Redirect to={ start } />)
	);

	componentDidMount() {
		console.log('signUp mounted!!');
		axios.get('/api/testing').then(resp => { console.log(resp); });
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/signup' } };
		const redirectToReferrer = this.props.userStatus;

		return (
			redirectToReferrer
				? (this.loginRedirect(from))
				: (
					<div>
						<p>Welcome back, please sign up!</p>
						<Button
							value={ 'Sign Up' }
							icon={ 'create' }
							type={ 'small' }
							iconSide={ 'left' }
							handleClick={ () => this.props.userCheckStatus('/api/signup') }
						/>
					</div>
				)
		);
	}
};

const mapStateToProps = (state) => {
  return { userStatus: state.userStatus };
};

const mapDispatchToProps = (dispatch) => {
  return { userCheckStatus: (url) => dispatch(userCheckStatus(url)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
