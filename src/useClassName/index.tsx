import { useEffect, useState } from 'react'

type stringReturnFunc = (...args: any[]) => string
export function useClassName (
  baseClass: string | stringReturnFunc, 
  dep: string[] | string
) {
  const [newClassName, setClassName] = useState(baseClass)
  const deps = ([] as string[]).concat(dep)
  
  useEffect(() => {
    setClassName(deps.reduce((acc, curr) => `${acc} ${curr}`, newClassName))
  }, deps)

  return [newClassName, setClassName] as [string, typeof setClassName]
}