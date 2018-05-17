import React, {Component} from 'react';
import { connect } from 'react-redux';
import { projectsGetList} from '../actions/projects';
import { projectGetData} from '../actions/project';
import { Link } from 'react-router-dom';

import DisplayModal from '../containers/Modal_NEW/DisplayModal';
import BookmarkBody from '../containers/Bookmarks/BookmarkBody';
import MilestoneBody from '../containers/Milestones/MilestoneBody';

import styles from '../assets/sass/Dashboard.module.scss';

class Dashboard extends Component {
	componentDidMount() {
		this.props.projectsGetList(this.props.userStatus.google_id)
	}

	clickHandler(projectID) {
		this.props.projectGetData(projectID);

	}

	renderProjectList() {
		return (
			<div className={ styles.col_12_of_12 }>
				<h1>Dashboard</h1>
				{this.props.projectsList.map((project, i ) => {
					return (
						<div>
							<Link to={`/project/${project.id}`} key={project.id} onClick={() => {this.clickHandler(project.id)}}>{`${project.id}.`} {project.project_name}</Link>
							<br/>
							<br/>
							{/* temporary styling fix, fix later */}
						</div>
					);
				})}

				{/* removed DisplayModals below because they were causing conflicts with DisplayModal in
				the header. add back later if needed ----> SEE GITHUB */}
			</div>
		)
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
	projectsList: state.projectsList
});

const mapDispatchToProps = (dispatch) => ({
	projectsGetList: (userID) => dispatch(projectsGetList(userID)),
	projectGetData: (projectID) => dispatch(projectGetData(projectID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);