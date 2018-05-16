import React from 'react';

const FilterLink = ({ filter, currentFilter, children, filterMilestone }) => {
  if (filter === currentFilter) {
    return <span>{ children }</span>;
  }
  return (
    <a
      href=""
      onClick={ (e) => {
        e.preventDefault();
        filterMilestone(filter);
      }}
    >
      { children }
    </a>
  );
};

export default FilterLink;
