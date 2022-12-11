import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, parseISO } from 'date-fns'

import './Task.css'

const Task = (props) => {
  const [description, setDescription] = useState(props.description)

  useEffect(() => {
    return () => {
      clearInterval(props.timerId)
    }
  }, [props.timerId])

  const onChanged = (event) => {
    setDescription(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onEdited(description)
    props.onToggleEditing()
  }

  const toggleCompleted = () => {
    props.onstopTimer()
    props.onToggleCompleted()
  }

  let date

  try {
    date = parseISO(props.addDate)
  } catch (error) {
    console.log(error.message)
  }

  const editingTask = (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" autoFocus onInput={onChanged} value={description} />
    </form>
  )

  return (
    <div>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={props.completed ? true : null}
          onChange={toggleCompleted}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">
            <button className="icon icon-play" onClick={props.onstartTimer}></button>
            <button className="icon icon-pause" onClick={props.onstopTimer}></button>
            <span>
              {`${Math.floor(props.timer / 60)}:${
                String(props.timer % 60).length === 2 ? props.timer % 60 : '0' + (props.timer % 60)
              }`}
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
        <button className="icon icon-edit" onClick={props.onToggleEditing}></button>
        <button className="icon icon-destroy" onClick={props.onDeleted}></button>
      </div>
      {props.editing ? editingTask : null}
    </div>
  )
}

Task.defaultProps = {
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

Task.propTypes = {
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

export default Task
