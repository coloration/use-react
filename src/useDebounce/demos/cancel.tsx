import React, { useState } from 'react'
import { useDebounce } from '@coloration/use-react'

const App = () => {

  const [text, setText, cancel] = useDebounce('', 1000)

  return (
    <>
      <p>
        text: { text }
      </p>
      <input onChange={e => setText(e.target.value)} />
      <button onClick={cancel}>cancel before 1000ms</button>
    </>
  )
}


export default App