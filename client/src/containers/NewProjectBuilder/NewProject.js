import React, { Component } from 'react';
import { connect } from 'react-redux';

// REPLACE WITH MY OWN ACTION
import { bookmarkGetInfo } from '../../actions/bookmarks';
import { handleCreateProject, handleProjectNaming } from '../../actions/createProject';


// REPLACE WITH MY OWN SUB-COMPONENTS
import BookmarkForm from './BookmarkForm';
import BookmarkMetaPreview from './BookmarkMetaPreview';
import Loading from '../../components/UI/Loading';
import BookmarkMetaEdit from './BookmarkMetaEdit';

import styles from '../../assets/sass/BookmarkBody.module.scss';

class BookmarkBody extends Component {
  handleProjectNaming = (projectName) => {
    this.props.createProject(projectName);
  }

  renderCreateProjectView = () => {
    if (this.props.createProjectHasErrored) {
      return <p>Sorry! There was an error with your request. Please try again later.</p>;
    }
    if (this.props.createProjectDataIsLoading) {
      return <Loading />;
    }

    let modalToShow;

    switch (this.props.createProjectModalToShow) {
      case 'nameProjectForm':
        modalToShow = <NewProjectForm handleProjectNaming={ this.handleProjectNaming } />;
      case 'addProjectDetails':
        modalToShow = <AddProjectDetails handleCreateProject= { this.handleCreateProject } />;
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
  // return {
  //   bookmarkHasErrored: state.bookmarkHasErrored,
  //   bookmarkIsLoading: state.bookmarkIsLoading,
  //   bookmarkStatus: state.bookmarkStatus,
  //   bookmarkShowAdd: state.bookmarkShowAdd,
  //   bookmarkShowPreview: state.bookmarkShowPreview,
  //   bookmarkShowEdit: state.bookmarkShowEdit,
  // };

  return {
    createProjectModalToShow: state.createProjectModalToShow,
    createProjectHasErrored: state.createProjectHasErrored,
    createProjectDataIsLoading: state.createProjectDataIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   bookmarkGetInfo: (bookmarkURL) => dispatch(bookmarkGetInfo(bookmarkURL))
  // };

  return {
    handleCreateProject: (projectInfo) => dispatch(handleCreateProject(projectInfo)),
    handleProjectNaming: (projectName) => dispatch(handleProjectNaming(projectName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
