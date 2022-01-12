import { useState } from 'react'
import { ThrottleOption, useThrottleCallback } from '../useThrottleCallback'
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