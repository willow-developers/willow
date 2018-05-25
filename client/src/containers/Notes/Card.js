import React from 'react';
import moment from 'moment';
import styles from '../../assets/sass/Card.module.scss';
import Button from '../../components/UI/Button';

const currentTimestamp = (time) => moment(time).format('MMMM Do YYYY, h:mm a');
const createPreviewText = (string) => string.split('').slice(0,150).join('').concat('...');

const Card = ({ id, title, content, createdAt, togglePreview, previewToggleNote, editNote, deleteNote, idx }) => (
  <div className={ styles.card }>
    <div className={ styles.header }>
      <h4 className={ styles.title }>{ title }</h4>
      <Button
        icon={ 'create' }
        type={ 'smallRound' }
        handleClick={ () => editNote({ id, title, content }) }
      />
      <Button
        icon={ 'delete' }
        type={ 'smallRound' }
        handleClick={ () => deleteNote(idx) }
      />
    </div>
    <div className={ styles.content } onClick={ () => previewToggleNote(id) }>{ togglePreview ? content : createPreviewText(content) } {togglePreview ? <div className={ styles.expander }>- Show Less</div> : <div className={ styles.expander }>+ Read More</div> }</div>
    <div className={ styles.footer }>
      <span className={ styles.createdAt }>{ currentTimestamp(createdAt) }</span>
    </div>
  </div>
);

export default Card;