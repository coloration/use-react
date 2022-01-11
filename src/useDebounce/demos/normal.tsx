import React, { useState } from 'react'
import { useDebounce } from '@coloration/use-react'

const App = () => {

  const [text, setText] = useDebounce('', 500)

  return (
    <>
      <p>
        text: { text }
      </p>
      <input onChange={e => setText(e.target.value)} />
    </>
  )
}


export default App