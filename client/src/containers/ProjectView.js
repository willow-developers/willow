import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal';
import { Redirect } from 'react-router-dom';

import styles from '../assets/sass/Dashboard.module.scss';

import {projectSave, projectGetData} from '../actions/project';

import WillowCore from '../components/WillowCore';
import Modals from './Modal/Modals';

class ProjectView extends Component {
	render() {
		console.log('in project view shouldRedirect and shouldRedirectTo: ', { shouldRedirect: this.props.shouldRedirect, shouldRedirectTo: this.props.shouldRedirectTo });
		console.log('in project view projectData: ', this.props.projectData);

		// debugger;

		// BROKEN:
		// if a new project has been created --> redirect
		// if (this.props.shouldRedirect && this.props.shouldRedirectTo) {
		// 	let projectID = this.props.shouldRedirectTo;
		// 	this.props.projectGetData(projectID);
		// 	return (
		// 		<Redirect to={{ pathname:`/project/${projectID}`}}/>
		// 	);
		// } else {
			return (
				<div className={ styles.col_12_of_12 }>
				<h4> Project View </h4>
				<WillowCore />
				<Modals />
				<button onClick={() => {
					console.log(this.props.projectData);
				}}> See projectData </button>
				<button onClick={() => this.props.saveProject(this.props.projectData)}> Save </button>
				</div>
			);
		}
	// related to broken code above
	// }
}

const mapStateToProps = (state) => {
	return { 
		projectData: state.projectData,
		userStatus: state.userStatus,
		shouldRedirect: state.shouldRedirect,
		shouldRedirectTo: state.shouldRedirectTo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { 
			saveProject: (projectData) => dispatch(projectSave(projectData)),
			projectGetData: (projectID) => dispatch(projectGetData(projectID))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
