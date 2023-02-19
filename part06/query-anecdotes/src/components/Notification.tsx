
import React from 'react'
import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const msg = useNotificationValue()
  console.log({ msg })

  if (!msg) return null

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
