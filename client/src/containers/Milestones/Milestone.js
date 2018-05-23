import React from 'react';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/Milestone.module.scss';

const Milestone = ({ toggleMilestone, editMilestone, completed, id, text, idx }) => (
  <li>
  	<span className={ styles.num }>
  		{ idx + 1 }
  	</span>
    <span
      onClick={ toggleMilestone }
      style={{ textDecoration: completed ? "line-through" : "none" }}
    >
      { text }
    </span>
    <Button
    	icon={ 'create' }
			type={ 'smallRound' }
			btnFloat={ 'right' }
			handleClick={ editMilestone }
    />
  </li>
);

export default Milestone;
