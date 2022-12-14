import PropTypes from 'prop-types'

import './TaskList.css'
import Task from '../Task'

const TaskList = ({ todo, onDeleted, onToggleCompleted, onToggleEditing, onEdited, onstartTimer, onstopTimer }) => {
  const elements = todo.map((item) => {
    const { id, completed, editing, description, timer, timerId, addDate } = item
    let classNames

    if (editing) {
      classNames = 'editing'
    } else if (completed) {
      classNames = 'completed'
    } else classNames = ''

    return (
      <li key={id} className={classNames}>
        <Task
          description={description}
          timer={timer}
          timerId={timerId}
          addDate={addDate}
          editing={editing}
          completed={completed}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={() => onToggleEditing(id)}
          onEdited={(newDescription) => onEdited(id, 'description', newDescription)}
          onstartTimer={() => onstartTimer(id)}
          onstopTimer={() => onstopTimer(id)}
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
  onToggleEditing: () => {},
  onEdited: () => {},
}

TaskList.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onEdited: PropTypes.func,
}

export default TaskList
