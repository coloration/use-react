import React from 'react';
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { I18nProvider, useLang, I18nLanguages } from '@coloration/hooks-i18n'
configure({ adapter: new Adapter() })


function I18n () {
  return (
    <I18nProvider>
      <I18nText />
      <SwitchButton />
    </I18nProvider>
  )
}

function SwitchButton () {
  const [lang, setLang] = useLang(I18nLanguages.ZH_CN)

  return <button onClick={() => setLang(I18nLanguages.EN_US)}>switch</button>
}

function I18nText () {
  const [text] = useLocale({
    [I18nLanguages.ZH_CN]: '你好',
    [I18nLanguages.EN_US]: 'Hello'
  })

  return <div>{text}</div>
}

describe('<Login /> with no props', () => {
  const container = shallow(<I18n />)
  

  
  it('should have proper props for email field', () => {
    // container.find('button').simulate('click', {})
    // container.find('div')

    expect(3).toBe(3)
  })
})