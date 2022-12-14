import { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = ({ onAdded }) => {
  const initialState = {
    description: '',
    min: '',
    sec: '',
  }

  const [state, setState] = useState(initialState)

  const onChanged = (name, event) => {
    setState((prevState) => {
      return { ...prevState, [name]: event.target.value }
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { description, min, sec } = state
    if (!isNaN(+min) && +min > 0 && !isNaN(+sec) && +sec > 0 && (+description !== 0 || description.includes('0'))) {
      const timer = +min * 60 + +sec
      onAdded(description, timer)
    }
    setState(initialState)
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        onInput={onChanged.bind(this, 'description')}
        value={state.description}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        required
        onInput={onChanged.bind(this, 'min')}
        value={state.min}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        required
        onInput={onChanged.bind(this, 'sec')}
        value={state.sec}
      />
      <input className="submit-btn" type="submit" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
}

export default NewTaskForm
