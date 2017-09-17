import React from 'react'
import Image from './Image'
import { mount } from 'enzyme'

const defaultProps = {
  imageSource: 'www.src.com',
  alternateText: 'alternate text'
}

describe('Image', () => {
  it('should set state to showImage=true on onLoad', () => {
    const wrapper = mount(<Image {...defaultProps} />)
  })
  it('should show error img if on error')
})
