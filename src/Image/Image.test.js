import React from 'react'
import Image from './Image'
import { shallow } from 'enzyme'

const defaultProps = {
  imageSource: 'www.src.com',
  alternateText: 'alternate text'
}

describe('Image', () => {
  it('should set state to showImage=true on onLoad', () => {
    const wrapper = shallow(<Image {...defaultProps} />)

    const image = wrapper.find('img')

    image.props().onLoad()

    expect(wrapper.state().showImage).toBe(true)
  })

  it('should show error img if on error', () => {
    const wrapper = shallow(<Image {...defaultProps} />)

    const image = wrapper.find('img')

    image.props().onError()

    expect(wrapper.state().hasError).toBe(true)
  })

  it('should show img with error src on Error and errorImageSource provided', () => {
    const errorImageSource = 'error.png'
    const props = { ...defaultProps, errorImageSource }
    const wrapper = shallow(<Image {...props} />)

    wrapper
      .find('img')
      .props()
      .onError()

    const errorImage = wrapper.find('img')

    expect(errorImage.props().src).toBe(errorImageSource)
  })

  it('should show img with imageSource if error and no errorImageSource provided', () => {
    const wrapper = shallow(<Image {...defaultProps} />)

    wrapper
      .find('img')
      .props()
      .onError()

    expect(wrapper.find('img').props().src).toBe(defaultProps.imageSource)
  })
})
