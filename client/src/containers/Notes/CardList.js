import React, { Fragment } from 'react';
import Card from './Card';

const CardList = ({ notes, previewToggleNote }) => (
  <Fragment>
    { notes.map((card) => <Card key={ card.id } previewToggleNote={ previewToggleNote } { ...card } />) }
  </Fragment>
);

export default CardList;

