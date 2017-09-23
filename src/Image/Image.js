import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  constructor(props) {
    super(props)

    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onImageError = this.onImageError.bind(this)

    this.state = {
      showImage: false,
      hasError: false
    }
  }

  onImageLoaded() {
    this.setState({
      showImage: true
    })
  }

  onImageError() {
    this.setState({
      hasError: true
    })
  }

  render() {
    const {
      imageSource,
      alternateText,
      errorImageSource,
      className,
      ...otherProps
    } = this.props

    const { showImage, hasError } = this.state

    const src = errorImageSource && hasError ? errorImageSource : imageSource

    return (
      <img
        className={`fade ${showImage ? 'fade-in' : ''} ${className}`}
        {...otherProps}
        alt={alternateText}
        src={src}
        onLoad={this.onImageLoaded}
        onError={this.onImageError}
      />
    )
  }
}

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alternateText: PropTypes.string.isRequired,
  errorImageSource: PropTypes.string
}

Image.defaultProps = {
  errorImageSource: null
}

export default Image
