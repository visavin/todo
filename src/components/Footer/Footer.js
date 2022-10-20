import {Component} from "react";

import './Footer.css'
import TasksFilter from "../TasksFilter";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">{this.props.todoCount} items left</span>
                <TasksFilter
                    statusFilter={this.props.statusFilter}
                    onToggleStatus = {(status) => this.props.onToggleStatus(status)}
                />
                <button className="clear-completed" onClick={this.props.onDeleteCompleted}>
                    Clear completed
                </button>
            </footer>
        )
    }
}
