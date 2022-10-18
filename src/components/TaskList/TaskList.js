import './TaskList.css'
import Task from "../Task";

const TaskList = ({todo, onDeleted, onToggleCompleted}) => {
    const elements = todo.map((item) => {
        const { id, completed, editing, description } = item
        const editingTask = <input type="text" className="edit" value={description} />
        let classNames = ''

        if (editing) {
            classNames = 'editing'
        } else if (completed) {
            classNames = 'completed'
        } else classNames = ''

        return (
            <li key={id} className = {classNames}>
                <Task
                    description = {description}
                    onDeleted = {() => onDeleted(id)}
                    onToggleCompleted = {() => onToggleCompleted(id)}
                />
                {editing ? editingTask : null}
            </li>
        )
    })

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}
export default TaskList
