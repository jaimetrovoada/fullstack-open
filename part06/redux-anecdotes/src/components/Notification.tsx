import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/anecdoteReducer'

const Notification = () => {
  const notification = useSelector<RootState, string>(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification