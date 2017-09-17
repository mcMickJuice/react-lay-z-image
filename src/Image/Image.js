import React, { Component } from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";
import throttle from "lodash/throttle";

// const ImageElement = styled.img`
// opacity: ${props => (props.isHidden ? 0 : 1)};
// transition: opacity 0.5s ease-in;
// `;

function isWithinViewRange(elementTop, elementBottom, offsetThreshold) {
  const topEdge = window.pageYOffset;
  const bottomEdge = window.pageYOffset + window.innerHeight;

  const upperBound = topEdge - offsetThreshold;
  const lowerBound = bottomEdge + offsetThreshold;

  return elementBottom > upperBound && elementTop < lowerBound;
}



class Image extends Component {
  constructor(props) {
    super(props);

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.onImageInRange = this.onImageInRange.bind(this);

    this.state = {
      showImage: false
    };
  }

  onImageLoaded() {
    setTimeout(() => {
      this.setState({
        showImage: true
      });
    }, 400);
  }

  onImageError() {
    console.log("image errored out");
  }

  onImageInRange() {
    this.setState({
      injectImage: true
    });
  }

  render() {
    const {
      imageSource,
      alternateText,
      errorImage,
      ...otherProps
    } = this.props;

    const { showImage } = this.state;

    return (<img
          isHidden={!showImage}
          className={`fade ${showImage ? "fade-in" : ""}`}
          {...otherProps}
          alt={alternateText}
          src={imageSource}
          onLoad={this.onImageLoaded}
          onError={this.onImageError}
        />)
  }
}

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alternateText: PropTypes.string.isRequired,
  errorImage: PropTypes.string,
  delay: PropTypes.number
};

Image.defaultProps = {
  errorImage: null
};

export default Image;
