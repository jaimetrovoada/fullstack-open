import React from 'react'

const Notification = ({
  message,
}: {
  message: {
    type: 'success' | 'error';
    msg: string;
  } | null;
}) => {
  if (message === null) {
    return null
  }

  return <div className={message.type} id="notification">{message.msg}</div>
}

export default Notification
