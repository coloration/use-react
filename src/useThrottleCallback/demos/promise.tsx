import React, { useCallback, useState } from 'react'
import { useDebounceCallback } from '@coloration/use-react'

const App = () => {

  const [content, setContent] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const [fetch, cancel] = useDebounceCallback((query: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: query + ':' + Math.random() })
      }, 1000)
    })
  }, { ms: 1000, catchCancel: true }, [])

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch('a=1&b=2').then(setContent)
    .catch(() => setContent({ error: 'cancel debounce' }))
    .finally(() => setLoading(false))
  }, [fetch])

  return (
    <>
      <p>
        loading: { JSON.stringify(loading) }
      </p>
      <p>
        content: { JSON.stringify(content) }
      </p>
      <button onClick={fetchData}>Count debounce 1000ms</button>
      <button onClick={cancel}>Cancel debounce before timeout 2000ms</button>
    </>
  )
}


export default App