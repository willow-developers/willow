import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/NewProjectDetails.module.scss';

class ProjectSummary extends Component {
  renderItems() {
    return _.map(this.props.createProjectMilestones, (item, i) => (
      <div className={` ${styles.row} ${styles.item} `} key={ i }>
        <div className={ styles.col_6_of_12 }>
          { item.item }
        </div>
        <div className={ styles.col_6_of_12 }>
          { item.label }
        </div>
      </div>
    ));
	}

	render() {
		return (
			<div>
				<h2>Project Summary: </h2>
        <h4>Project Title:</h4>
        <h2>{ this.props.title }</h2>
        <h4>Action Items and Objectives:</h4>
        <div className={` ${styles.row} ${styles.Header} `}>
          <div className={ styles.col_6_of_12 }>Step Name</div>
          <div className={ styles.col_6_of_12 }>Category</div>
        </div>
        { this.renderItems() }
        <br/>
        <br/>
        <Button
					handleClick={ () => { this.props.navigateBack('AddProjectDetails'); }}
					icon={ 'navigate_before' }
					value={ 'Back' }
					/* btnFloat={ 'right' } */ // COME BACK TO STYLE AND PLACE THE BUTTON
					type="submit"
					size="small"
				/>
        <br/>
        <br/>
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