import { FC, useCallback, useMemo, useState } from 'react'

/**
 * js 调用组件, 快捷方式, 注意callback 的作用域在传入时就确定了
 * @param FunctionComponent 
 * @param defaultProps 
 * @returns [functionComponent, invoke]
 */
 export function useInvoke<T = any> (FunctionComponent: FC<T>, defaultProps?: T) {

  const [cmpProps, setCmpProps] = useState<T | undefined>(defaultProps)
 
  const invoke = useCallback((props: T, merge = true) => {
    setCmpProps(merge ? Object.assign({}, cmpProps, props) : props)
  }, [cmpProps])

  const funcCmp = useMemo(() => {
    if (!cmpProps) return 
    return <FunctionComponent {...cmpProps} />
  }, [cmpProps])

  return [funcCmp, invoke] as [typeof funcCmp, typeof invoke]
}