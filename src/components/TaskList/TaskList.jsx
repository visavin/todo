import PropTypes from 'prop-types'

import './TaskList.css'
import Task from '../Task'

const TaskList = ({ todo, onDeleted, onToggleCompleted, onEdited }) => {
  const elements = todo.map((item) => {
    const { id, completed, description, timer } = item

    return (
      <li key={id}>
        <Task
          id={id}
          description={description}
          timer={timer}
          completed={completed}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEdited={(newDescription) => onEdited(id, 'description', newDescription)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todo: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdited: () => {},
}

TaskList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdited: PropTypes.func,
}

export default TaskList
