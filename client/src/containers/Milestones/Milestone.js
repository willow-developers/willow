import React from 'react';

const Milestone = ({ toggleMilestone, editMilestone, completed, id, text }) => (
  <li>
    <span
      onClick={ toggleMilestone }
      style={{ textDecoration: completed ? "line-through" : "none" }}
    >
      { id }: { text }
    </span>
    <button onClick={ editMilestone }>X</button>
  </li>
);

export default Milestone;
