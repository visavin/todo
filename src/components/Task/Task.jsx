import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, parseISO } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  static defaultProps = {
    description: '',
    addDate: '0',
    editing: false,
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    onEdited: () => {},
    onAdded: () => {},
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    addDate: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onEdited: PropTypes.func,
    onAdded: PropTypes.func,
  }

  state = {
    description: this.props.description,
  }

  onChanged = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onEdited(this.state.description)
    this.props.onToggleEditing()
  }

  toggleCompleted = () => {
    this.props.onstopTimer()
    this.props.onToggleCompleted()
  }

  componentWillUnmount() {
    if (this.props.timerId) clearInterval(this.props.timerId)
  }

  render() {
    const { description, timer, editing, completed, addDate, onDeleted, onToggleEditing, onstartTimer, onstopTimer } =
      this.props

    let date

    try {
      date = parseISO(addDate)
    } catch (error) {
      console.log(error.message)
    }

    const editingTask = (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" autoFocus onInput={this.onChanged} value={this.state.description} />
      </form>
    )

    return (
      <div>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={completed ? true : null}
            onChange={this.toggleCompleted}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">
              <button className="icon icon-play" onClick={onstartTimer}></button>
              <button className="icon icon-pause" onClick={onstopTimer}></button>
              <span>
                {`${Math.floor(timer / 60)}:${String(timer % 60).length === 2 ? timer % 60 : '0' + (timer % 60)}`}
              </span>
            </span>
            <span className="created">
              created{' '}
              {formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? editingTask : null}
      </div>
    )
  }
}
