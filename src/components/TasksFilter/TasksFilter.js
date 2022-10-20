import {Component} from "react";

import './TasksFilter.css'

export default class TasksFilter extends Component {
    setFilter = (event) => {
        this.props.onToggleStatus(event.target.innerText)
    }

    render() {
        return (
            <ul className="filters">
                <li>
                    <button
                        className={this.props.statusFilter === 'All' ? 'selected' : null}
                        onClick={this.setFilter}
                    >All</button>
                </li>
                <li>
                    <button
                        className={this.props.statusFilter === 'Active' ? 'selected' : null}
                        onClick={this.setFilter}
                    >Active</button>
                </li>
                <li>
                    <button
                        className={this.props.statusFilter === 'Completed' ? 'selected' : null}
                        onClick={this.setFilter}
                    >Completed</button>
                </li>
            </ul>
        )
    }
}
