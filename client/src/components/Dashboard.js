import React, {Component} from 'react';
import { connect } from 'react-redux';
import { projectGetData, resetRedirects, deleteProject } from '../actions/project';
import { projectsGetList } from '../actions/projects';
import { Link, Redirect } from 'react-router-dom';
import Button from '../components/UI/Button';

import styles from '../assets/sass/Dashboard.module.scss';
import '../assets/sass/Dashboard.scss';

class Dashboard extends Component {
	componentDidMount() {
		this.props.projectsGetList(this.props.userStatus.google_id)
	}

	clickHandler(projectID) {
		this.props.projectGetData(projectID);
	}

	renderProjectList() {
		// redirect if a new project was just created
		if (this.props.shouldRedirect) {
      // make sure data is available as we redirect to the project
			let projectID = this.props.shouldRedirectTo;
			this.props.projectGetData(projectID);
			// reset redirects in store to ensure user can navigate back to dashboard
			this.props.resetRedirects();
			return (
				<Redirect to={{ pathname:`/project/${this.props.shouldRedirectTo}`}}/>
			);
		} else {
			return (
				<div className={ styles.col_12_of_12 }>
					<h1>Dashboard</h1>
					{this.props.projectsList.map((project, idx) => {
						return (
							<div key={project.id} className={ styles.projects }>
								<Link
									to={`/project/${project.id}`}
									key={project.id}
									onClick={() => {this.clickHandler(project.id)}}>{`${ idx + 1 }.`} {project.project_name}</Link>
								<span>
									<Button
										icon={'delete'}
										type={'smallRound'}
										handleClick={() => this.props.deleteProject(project.id, idx)}
									/>
								</span>
							</div>
						);
					})}
					{/* removed DisplayModals below because they were causing conflicts with DisplayModal in
					the header. add back later if needed ----> SEE GITHUB FOR CODE */}
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{ this.renderProjectList() }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userStatus: state.userStatus,
	projectsList: state.projectsList,
	shouldRedirect: state.shouldRedirect,
	shouldRedirectTo: state.shouldRedirectTo,
});

const mapDispatchToProps = (dispatch) => ({
	projectsGetList: (userID) => dispatch(projectsGetList(userID)),
	projectGetData: (projectID) => dispatch(projectGetData(projectID)),
	resetRedirects: () => dispatch(resetRedirects()),
	deleteProject: (projectID, idx) => dispatch(deleteProject(projectID, idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);