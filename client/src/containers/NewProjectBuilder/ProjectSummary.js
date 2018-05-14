import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';

class ProjectSummary extends Component {

  renderProject() {
    let values = Object.values(this.props.milestones);

    return _.map(values, (item, i) => (
			<li key={i}>{ item }</li>
		));
	}

	render() {
		return (
			<div>
				<h2>Project Summary: </h2>
        <h4>Project Title:</h4>
        { this.props.title }
        <h4>Project Milestones:</h4>
        <ul>
          { this.renderProject() }
        </ul>
        <Button
          icon={ 'navigate_next' }
          value={ 'Create Project' }
          iconSide={ 'right' }
          handleClick={ () => { this.props.handleSaveProject(this.props); } }
        />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    title: state.createProjectTitle,
    milestones: state.createProjectMilestones,
    user: state.userStatus,
  };
};

// IF NEEDED:
const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummary);