import { useCallback, useState, useRef } from 'react'

export type DebounceOption = number | {
  ms?: number,
}


/**
 * 
 * @param fn 
 * @param option 
 * @param deps 
 * @returns 
 * 
 * usage:
 * const [handleInput, cancel] = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
 *   setCount(count + 1)
 * }, 300, [count])
 * 
 * useEffect(() => {
 *   return () => cancel()
 * }, [])
 * 
 * <input onChange={handleInput} />
 */
export function useDebounceCallback (fn: Function, option: DebounceOption = 200, deps: any[]) {

  const ms = typeof option === 'number' ? option : option.ms ?? 200
  const delay = useRef<number>(ms < 0 ? 0 : ms)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const updater = useCallback((...args) => {
    timer.current && clearTimeout(timer.current)

    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        resolve(fn(...args))
      }, delay.current)
    })
  }, [fn, ...deps])

  const cancel = useCallback(() => {
    timer.current && clearTimeout(timer.current)
  }, [])

  return [updater, cancel] as [typeof updater, typeof cancel]
}

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
  const [updater, cancel] = useDebounceCallback(setDebounced, options, [])

  return [debounced, updater, cancel] as [T, typeof updater, typeof cancel ]
}