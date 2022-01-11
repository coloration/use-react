import React, { useCallback, useRef, useState } from 'react'
import { useDebounceCallback } from '@coloration/use-react'

const App = () => {

  const [debounce, setDebounce] = useState(0)

  const [update, cancel] = useDebounceCallback(() => {
    setDebounce(debounce + 1)
  }, 1000, [debounce])

  return (
    <>
      <p>
        count: { debounce }
      </p>
      <button onClick={update}>Count debounce 1000ms</button>
      <button onClick={cancel}>Cancel debounce before 1000ms</button>
    </>
  )
}


export default App