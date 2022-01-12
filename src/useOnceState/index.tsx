import { useCallback, useState } from 'react'

export function useOnceState<S> (initialState?: S | (() => S)) {
  const [has, setHas] = useState(false)
  const [state, setState] = useState<S>(initialState as any)
  const setStateOnce = useCallback((s: S) => {
    if (has) return 
    setState(s)
    setHas(true)
  }, [has, setState, setHas])

  const reset = useCallback(() => {
    setHas(false)
  }, [])
  
  return [state, setStateOnce, setState, reset] as [
    typeof state, typeof setStateOnce, typeof setState, typeof reset
  ]
}