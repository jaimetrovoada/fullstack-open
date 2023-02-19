import React, { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state: string, action: {type: string, payload:string}) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return state = action.payload
  case 'REMOVE_NOTIFICATION':
    return state = ''
  default:
    return state
  }


}

const NotificationContext = createContext<{
  notification: string, dispatch: React.Dispatch<{
    type: string;
    payload: string;
  }>
}>({ notification: '', dispatch: () => null })

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context.dispatch
}

export const NotificationProvider = ({ children }:{children: React.ReactNode}) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')
  console.log({ notification })
  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext