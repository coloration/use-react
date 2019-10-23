import React, { Fragment, useEffect } from 'react'
import { 
  I18nProvider, 
  I18nLanguages, 
  useLocale, 
  useLang, 
} from '@coloration/hooks-i18n'

export default {
  title: 'i18n'
}

function I18nText () {
  const [text] = useLocale({
    [I18nLanguages.ZH_CN]: '你好',
    [I18nLanguages.EN_US]: 'Hello'
  })

  return <div>{text}</div>
}

function GlobalI18nCancelButton () {
  const [locale] = useLocale()

  return <button>{ locale.cancel }</button>
}

function LocalI18nCreateButton () {
  const [locale] = useLocale({
    [I18nLanguages.ZH_CN]: { btn: '创建' },
    [I18nLanguages.EN_US]: { btn: 'Create' }
  })

  console.log(222, locale)
  return <button>{locale.btn}</button>
}

function ButtonGroup () {
  const [lang, setLang] = useLang()
  return (
    <Fragment>
      <div>current language: {lang}</div>
      <button 
        style={{ marginRight: 20 }}
        onClick={() => setLang(I18nLanguages.ZH_CN)}>简体中文</button>
      <button onClick={() => setLang(I18nLanguages.EN_US)}>English</button>
    </Fragment>
  )
}



export function ButtonTab () {
  return (
    <I18nProvider locales={{
      [I18nLanguages.ZH_CN]: {
        create: '创建',
        cancel: '取消',
      },
      [I18nLanguages.EN_US]: {
        create: 'Create',
        cancel: 'Cancel'
      }
    }}>
      <I18nText />
      <GlobalI18nCancelButton />
      <LocalI18nCreateButton />
      <ButtonGroup />
    </I18nProvider>
  )
}