import PropTypes from 'prop-types'

import './TasksFilter.css'

const TasksFilter = ({ statusFilter, onToggleStatus }) => {
  const filters = ['All', 'Active', 'Completed']

  const buttonItems = filters.map((item, index) => {
    return (
      <li key={index}>
        <button
          className={statusFilter === item ? 'selected' : null}
          onClick={(event) => onToggleStatus(event.target.innerText)}
        >
          {item}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttonItems}</ul>
}

TasksFilter.defaultProps = {
  statusFilter: 'All',
  onToggleStatus: () => {},
}

TasksFilter.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  onToggleStatus: PropTypes.func,
}

export default TasksFilter
