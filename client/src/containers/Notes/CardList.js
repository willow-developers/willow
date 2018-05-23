import React, { Fragment } from 'react';
import Card from './Card';

const CardList = ({ notes, previewToggleNote, editNote }) => (
  <Fragment>
    { notes.map((card) => <Card key={ card.id } previewToggleNote={ previewToggleNote } editNote={ editNote } { ...card } />) }
  </Fragment>
);

export default CardList;

