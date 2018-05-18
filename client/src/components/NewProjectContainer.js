import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../assets/sass/Home.module.scss';

// old route:
import DisplayModal from '../containers/Modal/DisplayModal';

// new route:
// import DisplayModal from '../containers/Modal_NEW/DisplayModal';

import NewProject from '../containers/NewProjectBuilder/NewProject';
// import Modals from './Modals';
// import Custom from './types/Custom';

class NewProjectContainer extends Component {
  componentDidMount() {
    console.log('firing!');
  }

  render() {
    return (
      <div className={styles.col_12_of_12}>
        <h1>Welcome to the Willow!</h1>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
	userStatus: state.userStatus,
	projectsList: state.projectsList,
	shouldRedirect: state.shouldRedirect,
	shouldRedirectTo: state.shouldRedirectTo,
});

const mapDispatchToProps = (dispatch) => ({
	// projectsGetList: (userID) => dispatch(projectsGetList(userID)),
	// projectGetData: (projectID) => dispatch(projectGetData(projectID)),
	// resetRedirects: () => dispatch(resetRedirects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectContainer);