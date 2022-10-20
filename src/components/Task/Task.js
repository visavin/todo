import {Component} from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
    static defaultProps = {
        description: '',
        addDate: new Date(),
        editing: false,
        completed: false,
        onDeleted: () => {},
        onToggleCompleted: () => {},
        onToggleEditing: () => {},
        onEdited: () => {},
        onAdded: () => {},
    }

    static propTypes = {
        description: PropTypes.string.isRequired,
        addDate: PropTypes.instanceOf(Date).isRequired,
        editing: PropTypes.bool,
        completed: PropTypes.bool,
        onDeleted: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onToggleEditing: PropTypes.func,
        onEdited: PropTypes.func,
        onAdded: PropTypes.func,
    }

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
