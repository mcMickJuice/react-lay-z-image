// import throttle from 'lodash/throttle'

export const subscribeToScroll = (callback) => {
console.log('subbed')
  // const throttledCallback
  document.addEventListener('scroll', callback)

  return () => {
    document.removeEventListener('scroll', callback)
  }
}