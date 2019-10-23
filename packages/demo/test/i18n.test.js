import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import React, { Fragment } from 'react'
import { shallow, mount } from 'enzyme'
import { I18nProvider, useLang, useLocale, I18nLanguages } from '@coloration/hooks-i18n'
import Link from '../Link.react'

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


describe('', () => {
  it('render', () => {
    // mount(
    //   <div>
    //     <ButtonGroup />
    //   </div>
    // )
  })
  
  // it('has a A tag', () => {
  //   const wrapper = mount(<Link />)  
  //   expect(wrapper.find('a')).toHaveLength(1)
  // })

  // it('learn enzyme', () => {
  //   const wrapper = mount(<Link />)
  //   wrapper.find('a').getDOMNode().innerHTML = 'aaaa'
  //   expect(wrapper.find('a').text()).toEqual('aaaa')
  // })

  // it('set a url as href', () => {
  //   const wrapper = mount(<Link page="https://bing.com/" />)
  //   expect(wrapper.find('a').getDOMNode().href).toEqual('https://bing.com/')
  // })

  // it('hover set className leave reset className', () => {
  //   const wrapper = mount(<Link />)
  //   const tagA = wrapper.find('a')

  //   expect(tagA.getDOMNode().className).toEqual('normal')
    
  //   tagA.simulate('mouseenter')
  //   expect(tagA.getDOMNode().className).toEqual('hovered')
  //   tagA.simulate('mouseleave')
  //   expect(tagA.getDOMNode().className).toEqual('normal')

  // })
})