import React from 'react'
import type { FilterValue } from "./Types/Types"

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue 
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  
  const handleClick = (filterName: FilterValue) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onFilterChange(filterName);
  }

  return (
    <ul className="filters">
        <li>
            <a 
                href="#" 
                className={`${filterSelected === 'all' ? 'selected' : ''}`}
                onClick={handleClick('all')}> 
                All
            </a>
        </li>

        <li>
            <a 
                href="#"
                className={`${filterSelected === 'active' ? 'selected' : ''}`}
                onClick={handleClick('active')}>
                Active
            </a>
        </li>

        <li>
            <a 
                href="#"
                className={`${filterSelected === 'done' ? 'selected' : ''}`}
                onClick={handleClick('done')}>
                Done
            </a>
        </li>
    </ul>
  )
}