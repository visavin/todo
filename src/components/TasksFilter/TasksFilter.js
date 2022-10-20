import {Component} from "react";

import './TasksFilter.css'
import PropTypes from "prop-types";

export default class TasksFilter extends Component {
    static defaultProps = {
        statusFilter: 'All',
        onToggleStatus: () => {},
    }

    static propTypes = {
        statusFilter: PropTypes.string.isRequired,
        onToggleStatus: PropTypes.func,
    }

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
