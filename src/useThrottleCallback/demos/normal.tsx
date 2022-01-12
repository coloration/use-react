import React, { useState } from 'react'
import { useThrottleCallback } from '@coloration/use-react'

const App = () => {

  const [mouseX, setMouseX] = useState(1)
  const [update] = useThrottleCallback((e) => {
    setMouseX(e.pageX)
  }, 150, [])


  return (
    <>
      <div 
        style={{ width: '10vw', height: '10vw', background: 'pink' }} 
        onMouseMove={update}
      >
        mouseX: { mouseX }
      </div>
    </>
  )
}


export default App