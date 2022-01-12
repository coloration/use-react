import { useMemo, useEffect, useState, useRef, RefObject } from 'react'
import { useThrottleCallback } from '../useThrottleCallback'

/**
 * usage: 
 *  useScrollDraggable(ref.current, { mode: 'x', throttle: 100 })
 */
 export function useScrollDraggable (
  el: HTMLElement | null, 
  deps: any[],
  options?: {
    mode?: 'x' | 'y' | 'all' /* | 'each' */,
    throttle?: number
  },
  
) {
  
  const [isDragging, setIsDragging] = useState(false)
  const position = useRef({ x: -1, y: -1 })
  const opts = useMemo(() => {
    return Object.assign({ mode: 'all', throttle: 30 }, options)
  }, [options])

  const [handleMouseMove] = useThrottleCallback((e: MouseEvent) => {
    console.log(2222)
    if (!el) return 
    console.log(3333)
    const { x, y } = position.current
    let { mode } = opts
      if (mode === 'all') {
        if (x !== -1 && y !== -1) {
          el.scrollLeft = el.scrollLeft - (e.pageX - x)
          el.scrollTop = el.scrollTop - (e.pageY - y)
          Object.assign(position.current, { x: e.pageX, y: e.pageY })
        }
      }
      else {
        // if (mode === 'each') {
        //   mode = e.pageX - mouseDownX > e.pageY - mouseDownY ? 'x' : 'y'
        // }
        if (mode === 'x') {
          if (x !== -1) {
            el.scrollLeft = el.scrollLeft - (e.pageX - x)
            Object.assign(position.current, { x: e.pageX })
            // mouseDownY = e.pageY
          }
        }
        else if (mode === 'y') {
          if (y !== -1) {
            el.scrollTop = el.scrollTop - (e.pageY - y)
            // mouseDownX = e.pageX
            Object.assign(position.current, { y: e.pageY })
          }
        }
      }

  }, opts.throttle, [el, opts.mode])
  
  console.log(0)
  useEffect(() => {
    console.log('1111', el)
    if (!el) return
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      
      Object.assign(position.current, { x: e.pageX, y: e.pageY })
     
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      Object.assign(position.current, { x: -1, y: -1 })
    };

    // register
    el.addEventListener('mousedown', handleMouseDown)

    // dispose
    return () => {
      setIsDragging(false)
      el.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }    

  }, [el, handleMouseMove, ...deps])

  return {
    isDragging,
    ...position.current
  }
}