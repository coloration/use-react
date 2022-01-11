import React from 'react'
import { createStore } from '@coloration/use-react'

interface Store {
  count: number
}

const useStore = createStore<Store>({ count: 0 })


const Displayer = () => {
  const [{ n }] = useStore(s => ({ n: s.count }))
  return <div>Number is: { n }</div>
}

const Operator = () => {
  const [_, updateStore] = useStore()

  return <button onClick={() => updateStore({ count: Math.random( )})}>
    Random
  </button>
}

const App = () => {
  return (
    <>
      <Displayer />
      <hr />
      <Operator />
    </>
  )
}


export default App