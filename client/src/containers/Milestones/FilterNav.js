import React from 'react';
import FilterLink from './FilterLink';

const capFirst = (string) => {
  const label = string.split("_")[1].toLowerCase();
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const FilterNav = ({ filterOptions, filterMilestone, currentFilter }) => {
  return (
    <div>
      <span>Show: </span>
      { filterOptions.map((option, idx) => {
        return (
          <span key={ option }>
            <FilterLink
              filter={ option }
              filterMilestone={ filterMilestone }
              currentFilter={ currentFilter }
            >
              { capFirst(option) }
            </FilterLink>
            { filterOptions.length - 1 === idx ? '' : ', ' }
          </span>
        );
      })}
    </div>
  );
};

export default FilterNav;
