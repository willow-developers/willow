import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMilestone, toggleMilestone, editMilestone, updateMilestone, filterMilestone } from '../../actions/milestone';
import { titleNode, titleFormShow, titleEdit } from '../../actions/projects';

import MilestoneList from './MilestoneList';
import AddMilestone from './AddMilestone';
import FilterNav from './FilterNav';

import NodeTitleEdit from '../NodeTitle/NodeTitleEdit';
import NodeTitleDisplay from '../NodeTitle/NodeTitleDisplay';
import styles from '../../assets/sass/ExplorativeNode.module.scss';

class MilestoneColumn extends Component {
  createMilestone = (data) => {
    data.column = this.props.column;
    console.log('in react component: ', data);
    this.props.createMilestone(data);
  };

  toggleMilestone = (id) => {
    this.props.toggleMilestone(id);
  };

  filterMilestone = (filter) => {
    const extraFilter = [filter, this.props.column];
    console.log(extraFilter);
    this.props.filterMilestone(extraFilter);
  };

  editMilestone = (id) => {
    this.props.editMilestone(id);
  };

  updateMilestone = (data) => {
    this.props.updateMilestone(data);
  };
  
  updateNodeTitle = (str) => {
    this.props.titleNode(str);
  };
  
  showDisplayTitle = () => {
    this.props.titleEdit();
  };
  
  showTitleForm = () => {
    this.props.titleFormShow();
  };

  componentDidMount() {
    this.props.titleNode(this.props.nodeTitle);
  }
  
  render() {
    const { milestones, visibilityFilter, column, visibilityFilterColumn } = this.props;
    const filterOptions = ["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"];

    return (
      <div>
        <div className={ styles.row }>
          <div className={ styles.col_12_of_12 }>
            { this.props.showTitle
              ? (<NodeTitleDisplay
                  title={ this.props.setNodeTitle.length > 0
                    ? (this.props.setNodeTitle)
                    : (this.props.nodeTitle)
                  }
                  showTitleForm={ this.showTitleForm }
                />)
              : null
            }
            { this.props.showTitleForm
              ? (<NodeTitleEdit
                  title={ this.props.setNodeTitle.length > 0
                    ? (this.props.setNodeTitle)
                    : (this.props.nodeTitle)
                  }
                  updateNodeTitle={ this.updateNodeTitle }
                  showDisplayTitle={ this.showDisplayTitle }
                />)
              : null
            }
          </div>
        </div>
        <AddMilestone
          createMilestone={ this.createMilestone }
          column={ column }
        />
        { milestones.length > 0
          ? (<FilterNav
            filterOptions={ filterOptions }
            filterMilestone={ this.filterMilestone }
            currentFilter={ visibilityFilter }
            column={ column }
          />)
          : null
        }
        <MilestoneList
          milestones={ milestones }
          visibilityFilter={ visibilityFilter }
          toggleMilestone={ this.toggleMilestone }
          editMilestone={ this.editMilestone }
          updateMilestone={ this.updateMilestone }
          column={ column }
          visibilityFilterColumn={ visibilityFilterColumn }
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  milestones: state.milestones,
  visibilityFilter: state.visibilityFilter,
  visibilityFilterColumn: state.visibilityFilterColumn,
  setNodeTitle: state.setNodeTitle,
  showTitle: state.showTitle,
  showTitleForm: state.showTitleForm,
});

const mapDispatchToProps = (dispatch) => ({
  createMilestone: (data) => dispatch(createMilestone(data)),
  toggleMilestone: (id) => dispatch(toggleMilestone(id)),
  filterMilestone: (filter) => dispatch(filterMilestone(filter)),
  editMilestone: (id) => dispatch(editMilestone(id)),
  updateMilestone: (data) => dispatch(updateMilestone(data)),
  titleNode: (str) => dispatch(titleNode(str)),
  titleFormShow: () => dispatch(titleFormShow()),
  titleEdit: () => dispatch(titleEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneColumn);
