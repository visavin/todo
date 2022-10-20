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
  }

  onChanged = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onAdded(this.state.description)
    this.setState({
      description: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onInput={this.onChanged}
          value={this.state.description}
        />
      </form>
    )
  }
}
