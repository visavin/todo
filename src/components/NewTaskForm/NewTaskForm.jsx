import { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAdded: () => {},
  }

  static propTypes = {
    onAdded: PropTypes.func,
  }

  state = {
    description: '',
    min: '',
    sec: '',
  }

  onChanged = (name, event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { description, min, sec } = this.state
    const timer = +min * 60 + +sec
    if (+description !== 0 || description.includes('0')) this.props.onAdded(description, timer)
    this.setState({
      description: '',
      min: '',
      sec: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          onInput={this.onChanged.bind(this, 'description')}
          value={this.state.description}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          required
          onInput={this.onChanged.bind(this, 'min')}
          value={this.state.min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          onInput={this.onChanged.bind(this, 'sec')}
          value={this.state.sec}
        />
        <input className="submit-btn" type="submit" />
      </form>
    )
  }
}
