import React from 'react'
import { useEventListener, useDebounce } from '@coloration/use-react'


const App = () => {
  const [windowWidth, setWindowWidth] = useDebounce(window.innerWidth, 200)

  useEventListener(window, 'resize', () => {
    setWindowWidth(window.innerWidth)
  }, [])
  return (
    <>
      <p>window width: { windowWidth }</p>
    </>
  )
}


export default App