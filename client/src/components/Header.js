import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { NavLink, Link, withRouter } from 'react-router-dom';

import Button from './UI/Button';

import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/Header.module.scss';
import '../assets/sass/Header.scss';

import DisplayModal from '../containers/Modal_NEW/DisplayModal';
import NewProject from '../containers/NewProjectBuilder/NewProject';

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
				: (<a href="/auth/google">
						<Button
							value={ 'Login With Google' }
							icon={ 'account_circle' }
							type={ 'small' }
							iconSide={ 'left' }
						/>
					</a>)
		);
		if (this.props.userStatus === null) {
			return;
		} else if (this.props.userStatus === false) {
			return (
				<ul>
					<li>
						<AuthButton />
					</li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li>
						<DisplayModal
							value={'Create New Project'}
							id={ 4 }
							content={<NewProject />}
							size={ 'small' }
						/>
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

const mapStateToProps = (state) => ({
	userStatus: state.userStatus
});

const mapDispatchToProps = (dispatch) => ({
	userCheckStatus: (url) => dispatch(userCheckStatus(url))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));