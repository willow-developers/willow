import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';

import Button from './Button';

import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/Header.module.scss';
import '../assets/sass/Header.scss';

import * as actions from '../actions';

class Header extends Component {
	renderHeader() {
		const AuthButton = withRouter(({ history }) => {
			return (
				<Button
					value={ 'Sign out' }
					icon={ 'directions_run' }
					iconSide={ 'left' }
					type={ 'small' }
					handleClick={ () => axios.get('/api/logout')
						.then(() => this.props.fetchUser())
						.then(() => history.push("/"))
					}
				/>
			);
		});

		if (this.props.auth === null) {
			return;
		} else if (this.props.auth === false) {
			return (
				<ul>
					<li>
						<NavLink exact to='/login'>
							<Button
								value={ 'Login' }
								icon={ 'account_circle' }
								type={ 'small' }
								iconSide={ 'left' }
							/>
						</NavLink>
					</li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li>
						<Link to='/'>
							<Button
								value={ 'New Project' }
								icon={ 'add' }
								type={ 'small' }
								iconSide={ 'left' }
							/>
						</Link>
					</li>
					<li>
						<NavLink exact to='/dashboard'>
							<Button
								value={ 'Dashboard' }
								iconSide={ 'left' }
								type={ 'small' }
							/>
						</NavLink>
					</li>
					<li>
						<AuthButton />
					</li>
				</ul>
			);
		}
	}

	render() {
		return (
			<nav className={ styles.App_header }>
				<div className={ styles.grid }>
					<div className={ styles.row }>
						<div className={`${ styles.logo_block } ${ styles.col_2_of_8 }`}>
							<Link to='/'>
								<img src={ logo } className={ styles.logo } alt="logo" />
					    	<span className={ styles.title }>Willow</span>
				    	</Link>
						</div>
						<div className={`${ styles.nav_block } ${ styles.col_6_of_8 }`}>
							{ this.renderHeader() }
						</div>
					</div>
				</div>
			</nav>
		);
	}
};

function mapStateToProps({ auth, fetchUser }) {
	return { auth, fetchUser };
}

export default connect(mapStateToProps, actions)(Header);