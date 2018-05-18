import React from 'react';
import Milestone from './Milestone';
import EditMilestone from './EditMilestone';
import styles from '../../assets/sass/MilestoneList.module.scss';

const getVisibleMilestones = (milestones, filter, side) => {
  switch (filter) {
    case "SHOW_ALL":
      return milestones;
    case "SHOW_COMPLETED":
      return milestones.filter(ms => ms.completed && ms.column === side);
    case "SHOW_ACTIVE":
      return milestones.filter(ms => !ms.completed && ms.column === side);
    default:
      return milestones;
  }
};

const splitList = (milestones, side) => {
  const split = milestones.filter((item) => item.column === side);
  return split;
}

const MilestoneList = ({ milestones, visibilityFilter, toggleMilestone, editMilestone, updateMilestone, column, visibilityFilterColumn }) => {
  const visibleMilestones = getVisibleMilestones(splitList(milestones, column), visibilityFilter, visibilityFilterColumn);
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
            // milestone.edit
            // ? (<EditMilestone
            //     key={ milestone.id }
            //     editMilestone={ () => editMilestone(milestone.id) }
            //     updateMilestone={ updateMilestone }
            //     { ...milestone }
            //   />)
            // : (<Milestone
            //     idx={ idx }
            //     key={ milestone.id }
            //     toggleMilestone={ () => toggleMilestone(milestone.id) }
            //     editMilestone={ () => editMilestone(milestone.id) }
            //     { ...milestone }
            //   />)

export default MilestoneList;
