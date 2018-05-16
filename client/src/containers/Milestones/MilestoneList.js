import React from 'react';
import Milestone from './Milestone';
import EditMilestone from './EditMilestone';

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
    <ul>
      { visibleMilestones.map((milestone) => milestone.edit
        ? (<EditMilestone
            key={ milestone.id }
            editMilestone={ () => editMilestone(milestone.id) }
            updateMilestone={ updateMilestone }
            { ...milestone }
          />)
        : (<Milestone
            key={ milestone.id }
            toggleMilestone={ () => toggleMilestone(milestone.id) }
            editMilestone={ () => editMilestone(milestone.id) }
            { ...milestone }
          />)
      )}
    </ul>
  );
};

export default MilestoneList;
