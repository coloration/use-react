import { PlainObject } from '@coloration/kit'
import { createContext, useContext, useEffect, useState, FC, createElement, useCallback } from 'react'
import { useLocalStorage } from '../useLocalStorage'

export enum I18nLanguages {
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
}

export type I18nLocales = {
  [key: string]: PlainObject
}

export interface I18nProps {
  lang: I18nLanguages,
  setLang: (lang: I18nLanguages) => void,
  locales: I18nLocales,
}

export const I18nContext = createContext<I18nProps>(Object.create(null))

function defLang() {
  let defaultLang: I18nLanguages
  if (globalThis.navigator) {
    const { language, languages } = globalThis.navigator
    defaultLang = (
      language ||
      languages && languages.length && languages[0] ||
      I18nLanguages.ZH_CN
    ) as I18nLanguages
  }
  else {
    defaultLang = I18nLanguages.ZH_CN
  }

  return defaultLang
}

export const I18nProvider: FC<{
  lang?: I18nLanguages,
  locales?: I18nLocales,
  storageKey?: string
}> = ({
  children,
  lang: propLang,
  locales: propLocales,
  storageKey
}) => {

  const [storageLang, setStorageLang] = useLocalStorage(
    storageKey || 'lang', 
    propLang || defLang()
  )

  return <I18nContext.Provider 
    value={{
      lang: storageLang,
      setLang: setStorageLang,
      locales: propLocales || {
        [I18nLanguages.ZH_CN]: {},
        [I18nLanguages.EN_US]: {}
      }
    }}>
    {children}
  </I18nContext.Provider>
}

/**
 * 
 * @param locales use this param as locales instead of I18Provider's locales prop
 */
export function useLocale (locales?: I18nLocales) {
  const { lang, locales: rootLocales } = useContext(I18nContext)

  const currentLocales = locales || rootLocales
  if (!currentLocales)
    throw new Error('please set a root locales or component local locales at least')

  const [locale, setLocale] = useState(currentLocales[lang])

  useEffect(() => {
    setLocale(currentLocales[lang])
  }, [ lang ])

  return [ locale, setLocale ]
}

export function useLang () {
  const { lang, setLang } = useContext(I18nContext)
  return [ lang, setLang ]
}

export function useTranslation (locales?: I18nLocales) {
  const [locale] = useLocale(locales)

  const t = useCallback((str: string) => {
    return (locale || {})[str] ?? str
  }, [locale])

  return [t]
}