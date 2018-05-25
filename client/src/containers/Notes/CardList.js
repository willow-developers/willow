import React, { Fragment } from 'react';
import Card from './Card';

const CardList = ({ notes, previewToggleNote, editNote, deleteNote }) => (
  <Fragment>
    { notes.map((card, idx) => <Card idx={ idx } key={ card.id } previewToggleNote={ previewToggleNote } editNote={ editNote } deleteNote={ deleteNote } { ...card } />) }
  </Fragment>
);

export default CardList;

