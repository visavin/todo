import {Component} from "react";

import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends Component {
    state = {
        todoData: [
            {description: 'Completed task', completed: false, editing: false, id: 1},
            {description: 'Editing task', completed: false, editing: false, id: 2},
            {description: 'Active task', completed: false, editing: false, id: 3},
        ],
    }

    toggleProperty(arr, id, property) {
        const index = arr.findIndex((element) => element.id === id)
        const oldItem = arr[index]
        const newItem = { ...oldItem, [property]: !oldItem[property] }
        return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
    }

    onToggleCompleted = (id) => {
        // console.log('Toggle important', id)
        this.setState(({ todoData }) => ({
            todoData: this.toggleProperty(todoData, id, 'completed'),
        }))
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const newTodoData = todoData.filter((item) => item.id !== id)
            return {
                todoData: newTodoData,
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm />
                <section className="main">
                    <TaskList
                        todo = {this.state.todoData}
                        onDeleted = {this.deleteItem}
                        onToggleCompleted = {this.onToggleCompleted}
                    />
                    <Footer />
                </section>
            </section>
        )
    }
}
