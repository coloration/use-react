# @coloration/use-react

One extension library of basic hooks

## Startup

``` bash
$ npm install @coloration/use-react -S
```

``` tsx
import { useClassName } from '@coloration/use-react'

export type HTMLElementProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T>
export interface ButtonProps extends HTMLElementProps<HTMLButtonElement> {}

export function Button ({ className, ...restProps }: ButtonProps) {
  const [newClassName] = useClassName('my-button', className)

  return <button className={newClassName} {...restProps} />
}
```


## All Hooks

- [x] [`i18n`]()
  - `I18nLanguages<enum>`
  - `I18nLocales<type>`
  - `I18nProps<interface>`
  - `I18nContext<React.Context<I18nProps>>`
  - `I18nProvider<React.FC>`
  - `useLocale<Function>`
  - `useLang<Function>`
  - `useTranslation<Function>`
- [x] [`useLocalStorage<Function>`]()
- [ ] [`useLocationQuery<Function>`]()
- [x] [`createStore<Function: Function>`]()
- [x] [`useClassName<Function>`]()
- [x] [`useDebounce`]()
  - `useDebounceCallback<Function>`
  - `useDebounce<Function>`
- [x] [`useDocumentTitle<Function>`]()
- [x] [`useEventListener<Function>`]()
- [x] [`useInvoke<Function>`]()
- [x] [`useOnceState<Function>`]()
- [x] [`useScrollDraggable<Function>`]()
- [x] [`useStyle<Function>`]()
- [x] [`useThrottle`]()
  - `useThrottleCallback<Function>`
  - `useThrottle<Function>`