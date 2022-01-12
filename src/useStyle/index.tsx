import { CSSProperties, useEffect, useState } from 'react'

type CSSPropertiesReturnFunc = (...args: any[]) => CSSProperties
export function useStyle (
  baseStyle: CSSProperties | CSSPropertiesReturnFunc, 
  dep: CSSProperties[] | CSSProperties) {
  const [newStyle, setStyle] = useState(baseStyle)
  const deps = ([] as CSSProperties[]).concat(dep)

  useEffect(() => {
    setStyle(deps.reduce(
      (acc, current) => Object.assign(acc, current), 
      Object.assign({}, newStyle)
    ))
  }, deps)

  return [newStyle, setStyle] as [CSSProperties, typeof setStyle]
}