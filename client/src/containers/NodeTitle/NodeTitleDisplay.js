import React from 'react';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/NodeTitleDisplay.module.scss';

const NodeTitleDisplay = ({ title, showTitleForm }) => (
  <h1 className={ styles.nodeTitle }>
    { title }
    <Button
    	icon={ 'create' }
			type={ 'smallRound' }
			btnFloat={ 'right' }
			handleClick={ () => showTitleForm() }
    />
  </h1>
);

export default NodeTitleDisplay;