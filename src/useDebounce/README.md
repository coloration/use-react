---
title: useDebounce
subGroup: general
---

# useDebounce

``` ts
type UseDebounceCallbackHook = <T = any>(
  fn: (...args: any[]) => T | Promise<T>, 
  option: DebounceOption, 
  deps: any[]
) => [
  (...args: any[]) => Promise<T>, 
  () => void
]
```

## Normal

<Demo src="./demos/normal.tsx" />


## Cancel

<Demo src="./demos/cancel.tsx" />


