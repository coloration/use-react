import React from 'react'
import { useOnceState } from '@coloration/use-react'


const App = () => {
  const [count, setCountOnce, setCount, reset] = useOnceState(0)

  
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCountOnce(count + 1)}>Count Once</button>
      <button onClick={() => setCount(count + 1)}>Count</button>
      <button onClick={reset}>Reset once status</button>
    </>
  )
}


export default App