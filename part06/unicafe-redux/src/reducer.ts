import { createStore } from 'redux'

const counterReducer = (state = { good:0,ok:0, bad:0 }, action: {type:string }) => {
  console.log({ actionType: action.type })
  switch (action.type) {
  case 'GOOD':
    return {
      ...state, good: state.good + 1
    }
  case 'OK':
    return {
      ...state, ok: state.ok + 1
    }
  case 'BAD':
    return {
      ...state, bad: state.bad + 1
    }
  case 'ZERO':
    return { good:0,ok:0, bad:0 }
  default:
    return state
  }


}
export const store = createStore(counterReducer)

export default counterReducer