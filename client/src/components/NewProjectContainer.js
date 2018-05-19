import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from '../assets/sass/Home.module.scss';
import { projectGetData, resetRedirects } from '../actions/project';

// modals:
import { modalClose, modalOpen } from '../actions/modal';
import NewProject from '../containers/NewProjectBuilder/NewProject';
import Modals from '../containers/Modal_NEW/Modals';

class NewProjectContainer extends Component {
  componentDidMount() {
    this.props.openModal({
      id: 4,
      onClose: () => console.log("fire at closing event on custom"),
      content: <NewProject />,
    });
  }

  render() {
    const onClose = (obj) => {
      this.props.closeModal(obj);
    };
    
    if (this.props.shouldRedirect && this.props.shouldRedirectTo) {
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
        <div className={styles.col_12_of_12}>
          <Modals onClose={onClose}/>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
    isModalOpen: state.isModalOpen,
    shouldRedirect: state.shouldRedirect,
	  shouldRedirectTo: state.shouldRedirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  projectGetData: (projectID) => dispatch(projectGetData(projectID)),
  resetRedirects: () => dispatch(resetRedirects()),
  closeModal: (obj) => dispatch(modalClose(obj)),
  openModal: (obj) => dispatch(modalOpen(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectContainer);