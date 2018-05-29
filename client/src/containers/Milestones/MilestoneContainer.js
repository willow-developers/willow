import React from 'react';
import MilestoneColumnLeft from './MilestoneColumn';
import MilestoneColumnRight from './MilestoneColumn';
import styles from '../../assets/sass/MilestoneContainer.module.scss';

const MilestoneContainer = (props) => {
  const { leftSideNodes, rightSideNodes } = props;
  return (
    <div className={ styles.row }>
      <div className={ styles.col_6_of_12 }>
        <MilestoneColumnLeft data={ leftSideNodes } column="L" />
      </div>
      <div className={ styles.col_6_of_12 }>
        <MilestoneColumnRight data={ rightSideNodes } column="R" />
      </div>
    </div>
  );
};

export default MilestoneContainer;
