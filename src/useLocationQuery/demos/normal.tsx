/**
 * @title Button Demo1 Title
 * @description Button demo1 description
 */
import React from 'react'
import { useLocationQuery } from '@coloration/use-react'
 
const App = () => {
   const [query, setQuery, clear] = useLocationQuery({ name: 'David', age: 30 })
  
   return <div>
     <p>Name: {query.name}</p>
     <p>Age: {query.age}</p>
     <hr />
     <div className="flex gap-1">
      <button onClick={() => setQuery({ name: 'Bob' })}>Set</button>
      <button onClick={() => setQuery({ name: 'David' })}>Reset</button>
      <button onClick={clear}>Clear</button>
     </div>
   </div>
}
 
 export default App