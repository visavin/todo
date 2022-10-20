import './TaskList.css'
import Task from "../Task";

const TaskList = ({todo, onDeleted, onToggleCompleted, onToggleEditing, onEdited}) => {
    const elements = todo.map((item) => {
        const { id, completed, editing, description, addDate } = item
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
                    addDate = {addDate}
                    editing = {editing}
                    completed = {completed}
                    onDeleted = {() => onDeleted(id)}
                    onToggleCompleted = {() => onToggleCompleted(id)}
                    onToggleEditing = {() => onToggleEditing(id)}
                    onEdited = {(newDescription) => onEdited(id, newDescription)}
                />
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
