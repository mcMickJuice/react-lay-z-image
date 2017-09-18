export const subscribeToScroll = callback => {
  document.addEventListener('scroll', callback)

  return () => {
    document.removeEventListener('scroll', callback)
  }
}
