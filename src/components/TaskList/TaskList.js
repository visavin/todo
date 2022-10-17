import './TaskList.css'
import Task from "../Task";

const TaskList = ({todo}) => {
    const elements = todo.map((item) => {
        const { id, status, description } = item
        const editingTask = <input type="text" className="edit" value={description} />
        let classNames = ''

        switch(status) {
            case 'Completed':
                classNames = 'completed'
                break
            case 'Editing':
                classNames = 'editing'
                break
            default:
                classNames = ''
        }

        return (
            <li key={id} className = {classNames}>
                <Task description = {description} />
                {status === 'Editing' ? editingTask : null}
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
