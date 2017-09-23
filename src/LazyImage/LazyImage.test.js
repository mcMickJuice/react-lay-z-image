import React from 'react'
import { mount } from 'enzyme'
import LazyImage from './LazyImage'

const defaultProps = {
  imageSource: 'www.src.com',
  alternateText: 'alternate text'
}

describe('LazyImage', () => {
  describe('listens to onScroll', () => {
    beforeEach(() => {
      window.innerHeight = 0 //simulate image not being in view
    })

    it('should register with on scroll on mount', () => {
      document.addEventListener = jest.fn()
      const wrapper = mount(<LazyImage {...defaultProps} />)

      const mockEventListener = document.addEventListener.mock

      //for some reason document.addEventListern('error') is being called somewhere
      const onScrollCall = mockEventListener.calls.filter(callProps => {
        return callProps[0] === 'scroll'
      })[0]

      expect(onScrollCall).not.toBe(undefined)
    })

    it('should unregister with scroll on unmount', () => {
      document.removeEventListener = jest.fn()

      const wrapper = mount(<LazyImage {...defaultProps} />)
      wrapper.unmount()

      const firstCall = document.removeEventListener.mock.calls[0]

      expect(firstCall[0]).toBe('scroll')
    })
  })

  describe('on mount', () => {
    it('should set showImage to true if Image is within ViewPort', () => {
      window.innerHeight = 100

      const wrapper = mount(<LazyImage {...defaultProps} />)

      expect(wrapper.state().showImage).toBe(true)
    })
    it('should not set showImage to true if Image is not within ViewPort', () => {
      window.innerHeight = 0
      const wrapper = mount(<LazyImage {...defaultProps} />)

      expect(wrapper.state().showImage).toBe(false)
    })
  })
  
  //not sure how I can simulate this....
  describe('on scroll', () => {
    let Container = () => (
      <div>
        <div style={{ marginTop: 1000 }} />
        <LazyImage {...defaultProps} />
      </div>
    )

    beforeEach(() => {
      window.innerHeight = 768
    })

    // it('should set showImage to true if Image is scrolled into viewPort', () => {
    //   const wrapper = mount(<LazyImage style={{ marginTop: 1000 }} {...defaultProps} />)
    //   expect(wrapper.state().showImage).toBe(false)
    // })
    // it(
    //   'should not set showImage to true if scroll but image is not in viewPort'
    // )

  })
})
