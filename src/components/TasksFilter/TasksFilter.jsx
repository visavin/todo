import { Component } from 'react'
import './TasksFilter.css'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
  static defaultProps = {
    statusFilter: 'All',
    onToggleStatus: () => {},
  }

  static propTypes = {
    statusFilter: PropTypes.string.isRequired,
    onToggleStatus: PropTypes.func,
  }

  state = {
    filters: ['All', 'Active', 'Completed'],
  }

  setFilter = (event) => {
    this.props.onToggleStatus(event.target.innerText)
  }

  render() {
    const buttonItems = this.state.filters.map((item, index) => {
      return (
        <li key={index}>
          <button className={this.props.statusFilter === item ? 'selected' : null} onClick={this.setFilter}>
            {item}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttonItems}</ul>
  }
}
