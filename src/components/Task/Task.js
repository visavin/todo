import {Component} from "react";
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
    addDate = new Date(2022, 8, 30, 19, 31, 30, 5)

    render() {
        const {description} = this.props
        return (
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{description}</span>
                    <span className="created">created {formatDistanceToNow(this.addDate,
                        { includeSeconds: true, addSuffix: true})}
                    </span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
        )
    }
}
