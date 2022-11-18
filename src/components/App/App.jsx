import { Component } from 'react'
import { v4 as uuid } from 'uuid'

import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoItem('Task number 1'),
      this.createTodoItem('Task number 2'),
      this.createTodoItem('Task number 3'),
    ],
    statusFilter: 'All',
  }

  createTodoItem(description) {
    return {
      description,
      completed: false,
      editing: false,
      id: uuid(),
      addDate: new Date(),
    }
  }

  toggleProperty(arr, id, property) {
    const index = arr.findIndex((element) => element.id === id)
    const oldItem = arr[index]
    const newItem = { ...oldItem, [property]: !oldItem[property] }
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }))
  }

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }))
  }

  editItem = (id, description) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) item.description = description
        return item
      })
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (description) => {
    const newItem = this.createTodoItem(description)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => item.id !== id)
      return {
        todoData: newTodoData,
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => !item.completed)
      return {
        todoData: newTodoData,
      }
    })
  }

  onToggleStatus = (status) => {
    this.setState(() => ({
      statusFilter: status,
    }))
  }

  todoFiltered = () => {
    if (this.state.statusFilter === 'Completed') {
      return this.state.todoData.filter((item) => item.completed)
    } else if (this.state.statusFilter === 'Active') {
      return this.state.todoData.filter((item) => !item.completed)
    } else {
      return this.state.todoData
    }
  }

  render() {
    const todoCount = this.state.todoData.filter((element) => !element.completed).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todo={this.todoFiltered()}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            onEdited={this.editItem}
          />
          <Footer
            todoCount={todoCount}
            onDeleteCompleted={this.deleteCompleted}
            onToggleStatus={this.onToggleStatus}
            statusFilter={this.state.statusFilter}
          />
        </section>
      </section>
    )
  }
}
