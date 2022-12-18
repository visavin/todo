import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, parseISO } from 'date-fns'

import './Task.css'
import Timer from '../Timer'

const Task = (props) => {
  const getLocalStorage = (id) => {
    const taskData = window.localStorage.getItem('taskData')
    if (taskData) {
      const array = JSON.parse(taskData)
      const item = array.find((element) => element.id === id)
      if (item) {
        return [].concat(item)
      } else {
        const newItem = createTaskData()
        array.push(newItem)
        window.localStorage.setItem('taskData', JSON.stringify(array))
        return [].concat(newItem)
      }
    } else {
      window.localStorage.setItem('taskData', JSON.stringify([createTaskData()]))
      return [createTaskData()]
    }
  }

  function createTaskData() {
    return {
      id: props.id,
      addDate: new Date(),
    }
  }

  const [description, setDescription] = useState(props.description)
  const [taskData] = useState(getLocalStorage(props.id)[0])
  const [editing, setEditing] = useState(false)
  const [delTimer, setDelTimer] = useState(false)

  useEffect(() => {
    return () => {
      clearInterval(props.timerId)
    }
  }, [props.timerId])

  useEffect(() => {
    if (delTimer) {
      props.onDeleted()
      const taskData = window.localStorage.getItem('taskData')
      const array = JSON.parse(taskData)
      const newArray = array.filter((item) => item.id !== props.id)
      window.localStorage.setItem('taskData', JSON.stringify(newArray))
    }
  }, [delTimer])

  const onChanged = (event) => {
    setDescription(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onEdited(description)
    onToggleEditing()
  }

  const toggleCompleted = () => {
    props.onToggleCompleted()
  }

  const onToggleEditing = () => {
    setEditing((prevState) => !prevState)
  }

  const onDeleted = () => {
    setDelTimer(true)
  }

  const editingTask = (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" autoFocus onInput={onChanged} value={description} />
    </form>
  )

  const date = parseISO(JSON.parse(JSON.stringify(taskData.addDate)))

  let classNames

  if (editing) {
    classNames = 'editing'
  } else if (props.completed) {
    classNames = 'completed'
  } else classNames = ''

  return (
    <div className={classNames}>
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
            <Timer id={props.id} completed={props.completed} timer={props.timer} delTimer={delTimer} />
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

Task.defaultProps = {
  description: '',
  timer: 0,
  completed: false,
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdited: () => {},
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  timer: PropTypes.number,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdited: PropTypes.func,
}

export default Task
