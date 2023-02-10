import React from 'react'
import { store } from './reducer'

function App() {
  const increaseGood = () => store.dispatch({ type: 'GOOD' })
  const increaseOk = () => store.dispatch({ type: 'OK' })
  const increaseBad = () => store.dispatch({ type: 'BAD' })
  const resetState = () => store.dispatch({ type: 'ZERO' })

  const storeNow = store.getState()
  console.log(storeNow)

  return (
    <div className="App">
      <div>
        <button onClick={increaseGood}>good</button>
        <button onClick={increaseOk}>ok</button>
        <button onClick={increaseBad}>bad</button>
        <button onClick={resetState}>reset stats</button>
      </div>
      <div>
        <p>good: {storeNow.good}</p>
        <p>ok: {storeNow.ok}</p>
        <p>bad: {storeNow.bad}</p>
      </div>
    </div>
  )
}

export default App
