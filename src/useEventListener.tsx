import { useEffect } from 'react'

/**
 * 
 * @param el 
 * @param eventName 
 * @param fn 
 * @param deps 
 * 
 * usage; useEventListener(window, 'resize', () => {
 *  setCount(count + 1)
 * }, [count])
 */
export function useEventListener (
  el: Element | null | typeof globalThis, 
  eventName: string, 
  fn: EventListener | EventListenerObject, 
  deps: any[]) {

  useEffect(() => {
    if (!el) return
    el.addEventListener(eventName, fn)
    return () => {
      el.removeEventListener(eventName, fn)
    }
  }, [el, eventName, fn, ...deps])

}