import { Component } from 'react'
import PropTypes from 'prop-types'

import './Footer.css'
import TasksFilter from '../TasksFilter'

export default class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
    statusFilter: 'All',
    onDeleteCompleted: () => {},
    onToggleStatus: () => {},
  }

  static propTypes = {
    todoCount: PropTypes.number.isRequired,
    statusFilter: PropTypes.string.isRequired,
    onDeleteCompleted: PropTypes.func,
    onToggleStatus: PropTypes.func,
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.todoCount} items left</span>
        <TasksFilter
          statusFilter={this.props.statusFilter}
          onToggleStatus={(status) => this.props.onToggleStatus(status)}
        />
        <button className="clear-completed" onClick={this.props.onDeleteCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
