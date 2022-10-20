import {Component} from "react";
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
    state = {
        description: this.props.description,
    }

    onChanged = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onEdited(this.state.description)
        this.props.onToggleEditing()
    }

    render() {
        const {description, editing, completed, addDate, onDeleted, onToggleCompleted, onToggleEditing} = this.props
        const editingTask = (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       className="edit"
                       autoFocus
                       onInput={this.onChanged}
                       value={this.state.description}
                />
            </form>
        )

        return (
            <div>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        defaultChecked={completed ? true : null}
                        onChange={onToggleCompleted}
                    />
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">created {formatDistanceToNow(addDate,
                            { includeSeconds: true, addSuffix: true})}
                    </span>
                    </label>
                    <button className="icon icon-edit" onClick={onToggleEditing}></button>
                    <button className="icon icon-destroy" onClick={onDeleted} ></button>
                </div>
                {editing ? editingTask : null}
            </div>

        )
    }
}
