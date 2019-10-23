import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import React from 'react'
import { shallow, mount } from 'enzyme'
import Link from '../Link.react'

describe('todo list', () => {
  let wrapper
  it('renders', () => {
    wrapper = mount(<Link />)
  })

  it('has a A tag', () => {
    // const wrapper = mount(<Link />)
    expect(wrapper.find('a')).toHaveLength(1)
  })

  it('learn enzyme', () => {
    // const wrapper = mount(<Link />)
    wrapper.find('a').getDOMNode().innerHTML = 'aaaa'
    expect(wrapper.find('a').text()).toEqual('aaaa')
  })

  it('set a url as href', () => {
    const wrapper = mount(<Link page="https://bing.com/" />)
    expect(wrapper.find('a').getDOMNode().href).toEqual('https://bing.com/')
  })

  it('hover set className leave reset className', () => {
    // const wrapper = mount(<Link />)
    const tagA = wrapper.find('a')

    expect(tagA.getDOMNode().className).toEqual('normal')
    
    tagA.simulate('mouseenter')
    expect(tagA.getDOMNode().className).toEqual('hovered')
    tagA.simulate('mouseleave')
    expect(tagA.getDOMNode().className).toEqual('normal')

  })
})