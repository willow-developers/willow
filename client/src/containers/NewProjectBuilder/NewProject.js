import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS:
import { handleProjectNaming, handleAddMilestones, handleSaveProject } from '../../actions/createProject';

// COMPONENTS:
import Loading from '../../components/UI/Loading';
import NewProjectTitle from './NewProjectTitle';
import NewProjectDetails from './NewProjectDetails';
import ProjectSummary from './ProjectSummary';

// STYLING:
import styles from '../../assets/sass/BookmarkBody.module.scss';

class NewProjectBody extends Component {
  handleProjectNaming = (projectName) => {
    this.props.handleProjectNaming(projectName);
  }

  handleAddMilestones = (milestones) => {
    this.props.handleAddMilestones(milestones);
  }

  handleSaveProject = (projectDetails) => {
    console.log(projectDetails);
    this.props.handleSaveProject(projectDetails);
  }

  renderCreateProjectView = () => {
    console.log('this.props within NewProject.js : ', this.props);

    if (this.props.createProjectHasErrored) {
      return <p>Sorry! There was an error with your request. Please try again later.</p>;
    }
    if (this.props.createProjectDataIsLoading) {
      return <Loading />;
    }

    let modalToShow;

    if (this.props.createProjectModalToShow === 'NewProjectTitle') {
      modalToShow = <NewProjectTitle handleProjectNaming={ this.handleProjectNaming } />;
    } else if (this.props.createProjectModalToShow === 'AddProjectDetails') {
      modalToShow = <NewProjectDetails handleAddMilestones={ this.handleAddMilestones } />;
    } else if (this.props.createProjectModalToShow === 'ProjectSummary') {
      modalToShow = <ProjectSummary handleSaveProject={ this.handleSaveProject } />
    }

    return (
      <div>
        { modalToShow }
      </div>
    );
  };
  
  render() {
    console.log('firing in newProject.js!!');
		return (
      <div className={ styles.forLoader }>
        { this.renderCreateProjectView() }
      </div>
		);
  }
}

const mapStateToProps = (state) => {
  return {
    createProjectModalToShow: state.createProjectModalToShow,
    createProjectHasErrored: state.createProjectHasErrored,
    createProjectDataIsLoading: state.createProjectDataIsLoading,
    createProjectMilestones: state.createProjectMilestones,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectNaming: (projectName) => {
      console.log('firing projectNaming: ', projectName);
      dispatch(handleProjectNaming(projectName));
    },
    handleAddMilestones: (milestones) => {
      console.log('firing addMilestones!!', milestones)
      dispatch(handleAddMilestones(milestones));
    },
    handleSaveProject: (projectDetails) => {
      console.log('Saving project, here are the details within NewProject.js!!', projectDetails);
      debugger;
      dispatch(handleSaveProject(projectDetails));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectBody);
