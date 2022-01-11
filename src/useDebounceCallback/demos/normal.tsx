import React, { useState } from 'react'
import { useDebounceCallback } from '@coloration/use-react'

const App = () => {

  const [debounce, setDebounce] = useState(1)
  const [text, setText] = useState('')
  const [update] = useDebounceCallback((e) => {
    setDebounce(debounce + 1)
    setText(e.target.value)
  }, 500, [debounce])


  return (
    <>
      <p>
        text: { text }
      </p>
      <p>
        count: { debounce }
      </p>
      <input onInput={update} />
    </>
  )
}


export default App