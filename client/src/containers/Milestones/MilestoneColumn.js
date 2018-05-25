import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMilestone, toggleMilestone, editMilestone, updateMilestone, filterMilestone } from '../../actions/milestone';

import MilestoneList from './MilestoneList';
import AddMilestone from './AddMilestone';
import FilterNav from './FilterNav';

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

  render() {
    const { milestones, visibilityFilter, column, visibilityFilterColumn } = this.props;
    const filterOptions = ["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"];
    return (
      <div>
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
});

const mapDispatchToProps = (dispatch) => ({
  createMilestone: (data) => dispatch(createMilestone(data)),
  toggleMilestone: (id) => dispatch(toggleMilestone(id)),
  filterMilestone: (filter) => dispatch(filterMilestone(filter)),
  editMilestone: (id) => dispatch(editMilestone(id)),
  updateMilestone: (data) => dispatch(updateMilestone(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneColumn);
