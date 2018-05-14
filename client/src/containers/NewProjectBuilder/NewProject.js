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

class NewProjectBody extends Component {
  handleProjectNaming = (projectName) => {
    this.props.handleProjectNaming(projectName);
  }

  handleCreateProject = (projectName) => {
    this.props.handleCreateProject(projectName);
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

    if (this.props.createProjectModalToShow === 'NewProjectForm') {
      modalToShow = <NewProjectForm handleProjectNaming={ this.handleProjectNaming } />;
    } else {
      modalToShow = <AddDetailsAndSaveProject handleCreateProject= { this.handleCreateProject } />;
    }
    
    console.log('MTS', modalToShow);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectNaming: (projectName) => dispatch(handleProjectNaming(projectName)),
    handleCreateProject: (projectInfo) => dispatch(handleCreateProject(projectInfo))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectBody);
