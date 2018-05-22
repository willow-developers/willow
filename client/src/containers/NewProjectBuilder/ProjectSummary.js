import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';

class ProjectSummary extends Component {
  renderItems() {
    return _.map(this.props.createProjectMilestones, (item, i) => (
      <li key={i}>Item: { item.item }  --  Category: { item.label }</li>
    ));
	}

	render() {
		return (
			<div>
				<h2>Project Summary: </h2>
        <h4>Project Title:</h4>
        { this.props.title }
        <h4>Action Items and Objectives:</h4>
        <ul>
          { this.renderItems() }
        </ul>
        <Button
          icon={ 'navigate_next' }
          value={ 'Create Project' }
          iconSide={ 'right' }
          handleClick={ () => { this.props.handleSaveProject(this.props, this.props.modal); } }
        />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    title: state.createProjectTitle,
    createProjectMilestones: state.createProjectMilestones,
    user: state.userStatus,
  };
};

export default connect(mapStateToProps, null)(ProjectSummary);