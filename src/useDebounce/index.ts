import { useState } from 'react'
import { DebounceOption, useDebounceCallback } from '../useDebounceCallback'

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * 
 * usage: 
 * const [input, setInput, cancel] = useDebounce('')
 * <input onChange={e => setInput(e.target.value)} />
 */
 export function useDebounce<T> (value: T, options: DebounceOption = 200) {
  const [debounced, setDebounced] = useState(value)
  const [updater, cancel] = useDebounceCallback<T>(setDebounced, options, [])

  return [debounced, updater, cancel] as [T, typeof updater, typeof cancel]
}

export type UseDebounceHook = typeof useDebounce