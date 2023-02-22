import React from 'react'

interface Props {
    msg: string
}

const Notification: React.FC<Props> = ({ msg }) => {
  if (!msg) {
    return null
  }

  return (
    <div style={{
      padding: '5px',
      border: '1px solid green',
    }}>{msg}</div>
  )
}

export default Notification