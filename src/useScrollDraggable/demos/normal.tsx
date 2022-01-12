import React, { useEffect, useRef } from 'react'
import { useScrollDraggable } from '@coloration/use-react'

const App = () => {

  const sectionRef = useRef<HTMLDivElement>(null)

  useScrollDraggable(sectionRef.current, [sectionRef.current])

  useEffect(() => {
    console.log(sectionRef.current)
  }, [sectionRef.current])
  

  return (
    <>
      <div 
        ref={sectionRef} 
        style={{ width: 500, height: 500, overflow: 'auto' }}
      >
        { Array.from({ length: 100 }).map((_, i) => (
          <p key={i} style={{ whiteSpace: 'nowrap' }}>{i}--------------------------------------------------------------------------{i}</p>
        ))}
      </div>
    </>
  )
}


export default App