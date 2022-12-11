import PropTypes from 'prop-types'

import './Footer.css'
import TasksFilter from '../TasksFilter'

const Footer = ({ todoCount, onDeleteCompleted, onToggleStatus, statusFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter statusFilter={statusFilter} onToggleStatus={(status) => onToggleStatus(status)} />
      <button className="clear-completed" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todoCount: 0,
  statusFilter: 'All',
  onDeleteCompleted: () => {},
  onToggleStatus: () => {},
}

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onDeleteCompleted: PropTypes.func,
  onToggleStatus: PropTypes.func,
}

export default Footer
