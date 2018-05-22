import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from '../assets/sass/Dashboard.module.scss';

import { projectSave, projectGetData } from '../actions/project';

import WillowCore from '../components/WillowCore';
import Modals from './Modal/Modals';

class ProjectView extends Component {

	render() {
		let projectName;
		
		if (this.props.projectData.project) {
			// if the projectName has been retrieved from the server
			projectName = this.props.projectData.project.project_name;
		} else {
			projectName = '';
		}

		return (
			<Fragment>
				<div className={ styles.filler }>
					<WillowCore height={ this.props.screenSize.screenHeight } width={ this.props.screenSize.screenWidth } />
					<Modals />
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	projectData: state.projectData,
	userStatus: state.userStatus,
	screenSize: state.uiReducer,
});

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
