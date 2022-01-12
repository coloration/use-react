import { useCallback, useState, useRef } from 'react'

type ThrottleOptionObject = {
  ms: number,
  catchCancel: boolean
}

export type ThrottleOption = number | Partial<ThrottleOptionObject>


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
export function useThrottleCallback<T = any> (
  fn: (...args: any[]) => T | Promise<T> | void, 
  option: ThrottleOption, 
  deps: any[]
) {

  const { ms, catchCancel } = Object.assign<ThrottleOptionObject, Partial<ThrottleOptionObject>>(
    { ms: 200, catchCancel: false }, 
    typeof option === 'number' ? { ms: option } : option
  )

  const delay = useRef<number>(ms < 0 ? 0 : ms)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const resolver = useRef<Function>()
  const rejector = useRef<Function>()

  const clear = useRef((rejectable: boolean) => {
    if (!timer.current) return
    clearTimeout(timer.current)
    rejectable && rejector.current && catchCancel && rejector.current()
  })

  const updater = useCallback((...args) => {
    if (timer.current !== undefined) return
    return new Promise((resolve, reject) => {
      resolver.current = resolve
      rejector.current = reject
      timer.current = setTimeout(() => {
        timer.current = undefined
        const fnRes = fn(...args)
        if (fnRes instanceof Promise) {
          fnRes.then(resolve)
          .catch(reject)
        }
        else {
          resolve(fn(...args) as T)
        }
      }, delay.current)
    })
  }, [fn, ...deps])

  const cancel = useCallback(() => {
    clear.current(true)
  }, [])

  return [updater, cancel] as [typeof updater, typeof cancel]
  
}
