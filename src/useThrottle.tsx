import { useCallback, useState, useRef } from 'react'

export type ThrottleOption =  number | {
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
 * 
 * const [handleMousemove, cancel] = useThrottleCallback(() => {
 *   setCount(count + 1)
 * }, 300, [count])
 * 
 * useEffect(() => {
 *   return () => cancel()
 * }, [])
 * 
 * <div onMouseMove={handleMousemove} />
 */
export function useThrottleCallback (fn: Function, option: ThrottleOption = 200, deps: any[]) {
  const ms = typeof option === 'number' ? option : option.ms ?? 200
  const delay = useRef<number>(ms < 0 ? 0 : ms)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const updater = useCallback((...args) => {
    if (timer.current !== undefined) return
    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        timer.current = undefined
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
 * @param option 
 * @returns 
 * 
 * usage: 
 * const [pos, setPos] = useThrottle({ x: 0 }, 300)
 * 
 * <div onMouseMove={(e) => setPos({ x: e.pageX })} />
 */
export function useThrottle<T> (value: T, option: ThrottleOption = 200) {
  
  const [throttle, setThrottle] = useState(value)
  const [updater, cancel] = useThrottleCallback(setThrottle, option, [])

  return [throttle, updater, cancel] as [T, typeof updater, typeof cancel]
}