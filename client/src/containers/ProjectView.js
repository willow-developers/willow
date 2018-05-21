import React, { Component } from 'react';
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
			<div className={styles.col_12_of_12}>
				<h4>{projectName}</h4>
				<WillowCore />
				<Modals />

			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	projectData: state.projectData,
	userStatus: state.userStatus,
});

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
