import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { NavLink, Link, withRouter } from 'react-router-dom';

import Button from './UI/Button';

import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/Header.module.scss';
import '../assets/sass/Header.scss';

class Header extends Component {
	renderHeader() {
		const AuthButton = withRouter(({ history }) =>
			!!this.props.userStatus
				? (<Button
						value={ 'Sign out' }
						icon={ 'directions_run' }
						iconSide={ 'left' }
						type={ 'small' }
						handleClick={ () => {
							this.props.userCheckStatus('/api/logoutUser');
							history.push("/");
						}}
					/>)
				: (<NavLink exact to='/login'><Button
						value={ 'Login' }
						icon={ 'account_circle' }
						type={ 'small' }
						iconSide={ 'left' }
					/></NavLink>)
		);
		if (this.props.userStatus === null) {
			return;
		} else if (this.props.userStatus === false) {
			return (
				<ul>
					<li>
						<AuthButton />
					</li>
					{/* NO LONGER USING AFTER GOOGLE OAUTH REFACTOR */}
					{/* <li>
						<NavLink exact to='/signup'>
							<Button
								value={ 'Sign Up' }
								icon={ 'create' }
								type={ 'small' }
								iconSide={ 'left' }
							/>
						</NavLink>
					</li> */}
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
							<Link to={ !!this.props.userStatus ? '/dashboard' : '/' }>
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

const mapStateToProps = (state) => {
  return { userStatus: state.userStatus };
};

const mapDispatchToProps = (dispatch) => {
  return { userCheckStatus: (url) => dispatch(userCheckStatus(url)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));