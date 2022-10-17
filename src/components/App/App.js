import {Component} from "react";

import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends Component {
    todoData = [
        {description: 'Completed task', status: 'Completed', id: 1},
        {description: 'Editing task', status: 'Editing', id: 2},
        {description: 'Active task', status: 'Active', id: 3},
    ]

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm />
                <section className="main">
                    <TaskList todo = {this.todoData} />
                    <Footer />
                </section>
            </section>
        )
    }
}
