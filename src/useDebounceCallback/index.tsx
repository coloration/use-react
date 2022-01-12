import { useCallback, useRef } from 'react'

type DebounceOptionObject = {
  ms: number,
  catchCancel: boolean
}

export type DebounceOption = number | Partial<DebounceOptionObject>

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

export function useDebounceCallback <T = any>(
  fn: (...args: any[]) => T | Promise<T> | void, 
  option: DebounceOption, 
  deps: any[]
) {

  const { ms, catchCancel } = Object.assign<DebounceOptionObject, Partial<DebounceOptionObject>>(
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

  const updater = useCallback<(...args: any[]) => Promise<T>>((...args) => {
    clear.current(false)

    return new Promise<T>((resolve, reject) => {
      resolver.current = resolve
      rejector.current = reject

      timer.current = setTimeout(() => {
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

export type UseDebounceCallbackHook = typeof useDebounceCallback