import React, { Component } from "react";
import * as T from "prop-types";
import Image from "./Image";
import * as scrollService from "./scrollService";
import throttle from "lodash.throttle";

function isWithinViewRange(elementTop, offsetThreshold, window, id) {
  console.log(elementTop, id)
  return elementTop - offsetThreshold < window.innerHeight;
}

class LazyImage extends Component {
  constructor(props) {
    super(props);
    //defaut 400ms throttle
    this.onScroll = throttle(this.onScrollImpl.bind(this), 400);

    this.state = {
      showImage: false
    };
  }

  componentDidMount() {
    this.unsubscribeFromScroll = scrollService.subscribeToScroll(this.onScroll);
    this.onScrollImpl()
  }

  componentWillUnmount() {
    this.unsubscribeFromScroll && this.unsubscribeFromScroll();
  }

  onScrollImpl() {
    const { top } = this.marker.getBoundingClientRect();

    if (isWithinViewRange(top, 0, window, this.props.id)) {
      this.setState({
        showImage: true
      });
      this.unsubscribeFromScroll && this.unsubscribeFromScroll();
      this.unsubscribeFromScroll = null
    }
  }

  render() {
    const { percentThreshold, ...imageProps } = this.props;
    const { showImage } = this.state;
    return showImage ? (
      <Image {...imageProps} />
    ) : (
      <div ref={marker => (this.marker = marker)} />
    );
  }
}

LazyImage.propTypes = {
  ...Image.propTypes,
  percentThreshold: T.number
};

LazyImage.defaultProps = {
  ...(Image.defaultProps || {}),
  percentThreshold: 10
};

export default LazyImage;
