import { useState, useCallback, useEffect } from 'react'
import { PlainObject, queryToObject, objectToQuery } from '@coloration/kit'

export type UseLocationQueryHook = <T = PlainObject>(query?: T, raw?: boolean) => [T, (query: Partial<T>) => void, (...arg: any[]) => void]
export const useLocationQuery: UseLocationQueryHook = <T = PlainObject>(query?: T, raw: boolean = false) => {
  
  const [q, setQ] = useState<T>(query || Object.create(null))

  const setQuery = useCallback((query: Partial<T>) => {
    const search = objectToQuery(true, Object.assign({}, q, query))
    if (window) {
      window.location.search = search
      // const tagA = window.document.createElement('a')
      // const { hash, origin, pathname } = window.location
      // tagA.setAttribute('href', `${origin}${pathname}?${search}${hash}`)
      // tagA.click()
      // window.history.replaceState( {} , '', `${origin}${pathname}?${search}${hash}` );
    }
  }, [q])

  const clear = useCallback(() => {
    if (window) {
      window.location.search = ''
    }
  }, [])

  useEffect(() => {
    if (!window.location.search) return
    const query = queryToObject(raw, window.location.search) as T
    setQ(query)
  }, [window.location.search])

  return [q, setQuery, clear]
}