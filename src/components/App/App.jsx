import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import './App.css'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

const App = () => {
  const getLocalStorage = () => {
    const todo = window.localStorage.getItem('todoData')
    if (todo) return JSON.parse(todo)
    else return [createTodoItem('Task 1', 745), createTodoItem('Task 2', 744), createTodoItem('Task 3', 743)]
  }

  const [todoData, setTodoData] = useState(getLocalStorage())

  const [statusFilter, setStatusFilter] = useState('All')

  function createTodoItem(description, timer) {
    return {
      description,
      timer,
      completed: false,
      id: uuid(),
      deleteStatus: false,
    }
  }

  function toggleProperty(arr, id, property) {
    const index = arr.findIndex((element) => element.id === id)
    const oldItem = arr[index]
    const newItem = { ...oldItem, [property]: !oldItem[property] }
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodoData((prevState) => toggleProperty(prevState, id, 'completed'))
  }

  const onToggleDeleted = (id) => {
    setTodoData((prevState) => toggleProperty(prevState, id, 'deleteStatus'))
  }

  const editItem = (id, key, value) => {
    setTodoData((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) item[key] = value
        return item
      })
    })
  }

  const addItem = (description, timer) => {
    setTodoData((prevState) => [...prevState, createTodoItem(description, timer)])
  }

  const deleteItem = (id) => {
    setTodoData((prevState) => prevState.filter((item) => item.id !== id))
  }

  const deleteCompleted = () => {
    todoData.filter((item) => item.completed).forEach((item) => onToggleDeleted(item.id))
    // setTodoData((prevState) => prevState.filter((item) => !item.completed))
  }

  const onToggleStatus = (status) => {
    setStatusFilter(status)
  }

  const todoFiltered = () => {
    if (statusFilter === 'Completed') {
      return todoData.filter((item) => item.completed)
    } else if (statusFilter === 'Active') {
      return todoData.filter((item) => !item.completed)
    } else {
      return todoData
    }
  }

  const todoCount = todoData.filter((element) => !element.completed).length

  useEffect(() => {
    window.localStorage.setItem('todoData', JSON.stringify(todoData))
  }, [todoData])

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todo={todoFiltered()}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEdited={editItem}
        />
        <Footer
          todoCount={todoCount}
          onDeleteCompleted={deleteCompleted}
          onToggleStatus={onToggleStatus}
          statusFilter={statusFilter}
        />
      </section>
    </section>
  )
}

export default App
