import React from 'react';
import moment from 'moment';
// import styles from '../../assets/sass/Card.module.scss';

const currentTimestamp = (time) => moment(time).format('MMMM Do YYYY, h:mm a');
const createPreviewText = (string) => string.split('').slice(0,125).join('').concat('...');

const Card = ({ id, title, content, createdAt, togglePreview, previewToggleNote, editNote }) => (
  <div className="card">
    <div className="header">
      <h4 className="title">{ id }: { title }</h4>
      <button onClick={ () => {
        editNote({ id, title, content })
      }}>Edit</button>
    </div>
    <div className="content" onClick={ () => previewToggleNote(id) }>{ togglePreview ? content : createPreviewText(content) }</div>
    <div className="footer">
      <span className="createdAt">{ currentTimestamp(createdAt) }</span>
    </div>
  </div>
);

export default Card;