import React from 'react'
import { useDocumentTitle } from '@coloration/use-react'


const App = () => {
  const { setTitle } = useDocumentTitle(undefined, { template: '%s | use react'})

  
  return (
    <>
      <button onClick={() => setTitle('Foo')}>Foo</button>
      <button onClick={() => setTitle('Bar')}>Bar</button>
    </>
  )
}


export default App