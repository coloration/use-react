import { useEffect, useState } from 'react'

/** 
 * usage: 
 * const { setTitle } = useDocumentTitle('甘特图', { template: '人才驿站 | %s' }) 
 */
 export function useDocumentTitle (
  defaultTitle?: string, 
  options?: {
    template?: string
  }
) {
  const [title, setTitle] = useState(defaultTitle ?? globalThis.document.title ?? null)
  const [formatTitle, setFormatTitle] = useState(defaultTitle ?? '')
  const TMP = '%s'
  useEffect(() => {
    const tem = options?.template ?? TMP
    setFormatTitle(tem.replace(TMP, title))
  }, [options?.template, title])

  useEffect(() => {
    if (formatTitle === globalThis.document.title) return
    globalThis.document.title = formatTitle
  }, [formatTitle])

  return { title, formatTitle, setTitle, setFormatTitle }
}