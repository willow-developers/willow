import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import Button from './Button';

import logo from '../assets/images/logo.svg';
import styles from '../assets/sass/Header.module.scss';
import '../assets/sass/Header.scss';

const Header = ({ fakeAuth }) => {
	const AuthButton = withRouter(({ history }) =>
		fakeAuth.isAuthenticated
			? (<Button
						value={ 'Sign out' }
						icon={ 'directions_run' }
						iconSide={ 'left' }
						type={ 'small' }
						handleClick={ () => fakeAuth.signout(() => history.push("/")) }
					/>)
			: (
				<NavLink exact to='/login'>
					<Button
						value={ 'Login' }
						icon={ 'account_circle' }
						type={ 'small' }
						iconSide={ 'left' }
					/>
				</NavLink>
			)
	);

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
							<li><AuthButton /></li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

// handleClick={ this.eventName }

export default Header;