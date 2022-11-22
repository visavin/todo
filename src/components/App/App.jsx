import { Component } from 'react'
import { v4 as uuid } from 'uuid'

import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  getLocalStorage = () => {
    const todo = window.localStorage.getItem('todoData')
    if (todo) return JSON.parse(todo)
    else
      return [
        this.createTodoItem('Task 1', 745),
        this.createTodoItem('Task 2', 744),
        this.createTodoItem('Task 3', 743),
      ]
  }

  state = {
    todoData: this.getLocalStorage(),
    statusFilter: 'All',
  }

  createTodoItem(description, timer) {
    return {
      description,
      timer,
      timerId: '',
      completed: false,
      editing: false,
      id: uuid(),
      addDate: JSON.parse(JSON.stringify(new Date())),
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
    this.stopTimer(id)
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }))
  }

  editItem = (id, key, value) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) item[key] = value
        return item
      })
      return {
        todoData: newArray,
      }
    })
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) {
          if (!item.timerId) {
            item.timerId = setInterval(() => {
              if (item.timer > 0) item.timer--
              else this.stopTimer(item.id)
              this.forceUpdate()
              window.localStorage.setItem('todoData', JSON.stringify(this.state.todoData))
            }, 1000)
          }
        }
        return item
      })
      return {
        todoData: newArray,
      }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) {
          if (item.timerId) clearInterval(item.timerId)
          item.timerId = ''
        }
        return item
      })
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (description, timer) => {
    const newItem = this.createTodoItem(description, timer)
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

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.todoData !== this.state.todoData)
      window.localStorage.setItem('todoData', JSON.stringify(this.state.todoData))
  }

  componentDidMount() {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.timerId) {
          item.timerId = setInterval(() => {
            if (item.timer > 0) item.timer--
            else this.stopTimer(item.id)
            this.forceUpdate()
            window.localStorage.setItem('todoData', JSON.stringify(this.state.todoData))
          }, 1000)
        }
        return item
      })
      return {
        todoData: newArray,
      }
    })
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
            onstartTimer={this.startTimer}
            onstopTimer={this.stopTimer}
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
