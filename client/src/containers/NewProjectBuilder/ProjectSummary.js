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
			<div className={` ${styles.padder} ${styles.summery} `}>
        <div className={ styles.row }>
          <div className={ styles.col_12_of_12 }>
            <h1>Project Summary: </h1>
          </div>
          <div className={` ${styles.col_12_of_12} ${styles.summery} `}>
            <h2>Project Title:</h2>
            <p>{ this.props.title }</p>
          </div>
          <div className={` ${styles.col_12_of_12} ${styles.summery} ${styles.table} `}>
            <h2>Action Items and Objectives:</h2>
          </div>
          <div className={ styles.col_12_of_12 }>
            <div className={` ${styles.row} ${styles.Header} `}>
              <div className={ styles.col_6_of_12 }>Step Name</div>
              <div className={ styles.col_6_of_12 }>Category</div>
            </div>
            { this.renderItems() }
          </div>
        </div>
        <div className={ styles.btnBar }>
          <Button
            handleClick={ () => { this.props.navigateBack('AddProjectDetails'); }}
            icon={ 'navigate_before' }
            value={ 'Back' }
            btnFloat={ 'left' }
            type="submit"
            size="small"
          />
          <Button
            icon={ 'navigate_next' }
            value={ 'Create Project' }
            iconSide={ 'right' }
            btnFloat={ 'right' }
            handleClick={ () => { this.props.handleSaveProject(this.props, this.props.modal); } }
          />
        </div>
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