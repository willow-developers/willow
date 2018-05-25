import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS:
import {
  handleProjectNaming,
  handleAddMilestones,
  handleSaveProject,
  handleAddItem,
  deleteItem,
  navigateBack,
} from '../../actions/createProject';

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
  };

  handleAddItem = (values) => {
    this.props.handleAddItem(values);
  };

  handleAddMilestones = (milestones) => {
    this.props.handleAddMilestones(milestones);
  }

  deleteItem = (idx) => {
    this.props.deleteItem(idx, this.props.modal[0]);
  }

  handleSaveProject = (projectDetails) => {
    this.props.handleSaveProject(projectDetails, this.props.modal[0]);
  };

  navigateBack = (modalTitle) => {
    this.props.navigateBack(modalTitle);
  };

  renderCreateProjectView = () => {
    if (this.props.createProjectHasErrored) return <p>Sorry! There was an error with your request. Please try again later.</p>;
    if (this.props.createProjectDataIsLoading) return <Loading />;

    let modalToShow;
    if (this.props.createProjectModalToShow === 'NewProjectTitle') {
      modalToShow = <NewProjectTitle handleProjectNaming={ this.handleProjectNaming } />;
    } else if (this.props.createProjectModalToShow === 'AddProjectDetails') {
      modalToShow = <NewProjectDetails
                      handleAddItem={ this.handleAddItem }
                      handleAddMilestones={ this.handleAddMilestones }
                      deleteItem ={ this.deleteItem }
                      navigateBack={ this.navigateBack }
                    />;
    } else if (this.props.createProjectModalToShow === 'ProjectSummary') {
      modalToShow = <ProjectSummary
                      handleSaveProject={ this.handleSaveProject }
                      navigateBack={ this.navigateBack }  
                    />
    }

    return (
      <div>{ modalToShow }</div>
    );
  };
  
  render() {
		return (
      <div className={ styles.forLoader }>
        { this.renderCreateProjectView() }
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  createProjectModalToShow: state.createProjectModalToShow,
  createProjectHasErrored: state.createProjectHasErrored,
  createProjectDataIsLoading: state.createProjectDataIsLoading,
  modal: state.isModalOpen.modals,
});

const mapDispatchToProps = (dispatch) => ({
  handleProjectNaming: (projectName) => { dispatch(handleProjectNaming(projectName)); },
  handleAddItem: (item) => { dispatch(handleAddItem(item)); },
  deleteItem: (idx, modal) => { dispatch(deleteItem(idx, modal)); },
  handleAddMilestones: (milestones) => { dispatch(handleAddMilestones(milestones)); },
  handleSaveProject: (projectDetails, modal) => { dispatch(handleSaveProject(projectDetails, modal)); },
  navigateBack: (modalTitle) => { dispatch(navigateBack(modalTitle)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectBody);