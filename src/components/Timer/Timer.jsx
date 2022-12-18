import React, { useEffect, useState } from 'react'

import './Timer.css'

const Timer = (props) => {
  const getLocalStorage = (id = props.id) => {
    const timerData = window.localStorage.getItem('timerData')
    if (timerData) {
      const array = JSON.parse(timerData)
      const item = array.find((element) => element.id === id)
      if (item) {
        return [].concat(item)
      } else {
        const newItem = createTimerData()
        array.push(newItem)
        window.localStorage.setItem('timerData', JSON.stringify(array))
        return [].concat(newItem)
      }
    } else {
      window.localStorage.setItem('timerData', JSON.stringify([createTimerData()]))
      return [createTimerData()]
    }
  }

  const initTimerData = getLocalStorage()[0]

  const [timerData, setTimerData] = useState(initTimerData)

  const { viewTimer } = timerData
  function createTimerData(id = props.id) {
    return {
      id,
      timerId: null,
      endDate: null,
      viewTimer: props.timer,
    }
  }

  function deleteTimerData(id = props.id) {
    const timerData = window.localStorage.getItem('timerData')
    const array = JSON.parse(timerData)
    window.localStorage.setItem('timerData', JSON.stringify(array.filter((element) => element.id !== id)))
  }

  function tick() {
    if (timerData.viewTimer > 0) setTimer('viewTimer', timerData.endDate - Math.floor(Date.now() / 1000))
    else onStopTimer()
  }

  const setTimer = (key, value) => {
    const data = window.localStorage.getItem('timerData')
    const array = JSON.parse(data)
    const newArray = array.filter((element) => element.id !== props.id)
    const item = array.find((element) => element.id === props.id)
    const newItem = { ...item, [key]: value }
    window.localStorage.setItem('timerData', JSON.stringify([...newArray, newItem]))
    timerData[key] = value
    setTimerData(newItem)
  }

  const onStartTimer = () => {
    if (!timerData.timerId && timerData.viewTimer > 0) {
      setTimer('endDate', Math.floor(Date.now() / 1000) + timerData.viewTimer)
      const newTimerId = setInterval(tick, 1000)
      setTimer('timerId', newTimerId)
    }
  }

  const onStopTimer = () => {
    if (timerData.timerId) {
      clearInterval(timerData.timerId)
      setTimer('timerId', null)
      setTimer('endDate', null)
    }
  }

  useEffect(() => {
    if (timerData.endDate) {
      if (timerData.endDate - Math.floor(Date.now() / 1000) > 0)
        setTimer('viewTimer', timerData.endDate - Math.floor(Date.now() / 1000))
      else {
        // timerData.viewTimer = 0
        setTimer('viewTimer', 0)
        onStopTimer()
      }
    }

    if (timerData.timerId) {
      const newTimerId = setInterval(tick, 1000)
      setTimer('timerId', newTimerId)
    }
    return () => {
      clearInterval(timerData.timerId)
    }
  }, [])

  useEffect(() => {
    if (props.delTimer) deleteTimerData()
  }, [props.delTimer])

  useEffect(() => {
    if (props.completed) onStopTimer()
  }, [props.completed])

  return (
    <React.Fragment>
      <button className="icon icon-play" onClick={!props.completed ? onStartTimer : null}></button>
      <button className="icon icon-pause" onClick={onStopTimer}></button>
      <span>
        {`${Math.floor(viewTimer / 60)}:${
          String(viewTimer % 60).length === 2 ? viewTimer % 60 : '0' + (viewTimer % 60)
        }`}
      </span>
    </React.Fragment>
  )
}

export default Timer
