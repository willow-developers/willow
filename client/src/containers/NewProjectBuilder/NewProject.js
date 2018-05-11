import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS:
import { handleCreateProject, handleProjectNaming } from '../../actions/createProject';

// COMPONENTS:
import Loading from '../../components/UI/Loading';
import NewProjectForm from './NewProjectForm';
import AddDetailsAndSaveProject from './AddDetailsAndSaveProject';

// STYLING:
import styles from '../../assets/sass/BookmarkBody.module.scss';

class BookmarkBody extends Component {
  // MAYBE:
  // handleProjectNaming = (projectName) => {
  //   this.props.handleProjectNaming(projectName);
  // }

  // MAYBE:
  // handleCreateProject = (projectName) => {
  //   this.props.handleCreateProject(projectName);
  // }

  renderCreateProjectView = () => {
    if (this.props.createProjectHasErrored) {
      return <p>Sorry! There was an error with your request. Please try again later.</p>;
    }
    if (this.props.createProjectDataIsLoading) {
      return <Loading />;
    }

    let modalToShow;

    switch (this.props.createProjectModalToShow) {
      case 'NewProjectForm':
        modalToShow = <NewProjectForm handleProjectNaming={ this.handleProjectNaming } />;
      case 'AddProjectDetails':
        modalToShow = <AddDetailsAndSaveProject handleCreateProject= { this.handleCreateProject } />;
    }

    return (
      <div>
        { modalToShow }
      </div>
    );
  };
  
  // ME:
  render() {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectNaming: (projectName) => dispatch(handleProjectNaming(projectName)),
    handleCreateProject: (projectInfo) => dispatch(handleCreateProject(projectInfo))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
