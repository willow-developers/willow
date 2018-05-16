import React from 'react';
import Milestone from './Milestone';
import EditMilestone from './EditMilestone';
import styles from '../../assets/sass/MilestoneList.module.scss';

const getVisibleMilestones = (milestones, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return milestones;
    case "SHOW_COMPLETED":
      return milestones.filter(ms => ms.completed);
    case "SHOW_ACTIVE":
      return milestones.filter(ms => !ms.completed);
    default:
      return milestones;
  }
};

const MilestoneList = ({ milestones, visibilityFilter, toggleMilestone, editMilestone, updateMilestone }) => {
  const visibleMilestones = getVisibleMilestones(milestones, visibilityFilter);
  return (
    <div className={ styles.row }>
      <div className={ styles.col_12_of_12 }>
        <ul className={ styles.msList }>
          { visibleMilestones.map((milestone, idx) => milestone.edit
            ? (<EditMilestone
                key={ milestone.id }
                editMilestone={ () => editMilestone(milestone.id) }
                updateMilestone={ updateMilestone }
                { ...milestone }
              />)
            : (<Milestone
                idx={ idx }
                key={ milestone.id }
                toggleMilestone={ () => toggleMilestone(milestone.id) }
                editMilestone={ () => editMilestone(milestone.id) }
                { ...milestone }
              />)
          )}
        </ul>
      </div>
    </div>
  );
};

export default MilestoneList;
