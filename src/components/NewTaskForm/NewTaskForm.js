import {Component} from "react";

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
    state = {
        description: '',
    }

    onChanged = (event) => {
        // console.log(event.target.value);
        this.setState({
            description: event.target.value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onAdded(this.state.description)
        this.setState({
            description: '',
        })
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmit}>
                    <input className="new-todo"
                           placeholder="What needs to be done?"
                           autoFocus
                           onInput={this.onChanged}
                           value={this.state.description}
                    />
                </form>
            </header>
        )
    }
}
