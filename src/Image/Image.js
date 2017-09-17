import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  constructor(props) {
    super(props)

    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onImageError = this.onImageError.bind(this)

    this.state = {
      showImage: false
    }
  }

  onImageLoaded() {
    this.setState({
      showImage: true
    })
  }

  onImageError() {
    console.log('image errored out')
  }

  render() {
    const { imageSource, alternateText, errorImage, ...otherProps } = this.props

    const { showImage } = this.state

    return (
      <img
        className={`fade ${showImage ? 'fade-in' : ''}`}
        {...otherProps}
        alt={alternateText}
        src={imageSource}
        onLoad={this.onImageLoaded}
        onError={this.onImageError}
      />
    )
  }
}

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alternateText: PropTypes.string.isRequired,
  errorImage: PropTypes.string,
  delay: PropTypes.number
}

Image.defaultProps = {
  errorImage: null
}

export default Image
