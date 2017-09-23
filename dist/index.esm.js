import React, { Component } from 'react';
import { number } from 'prop-types';
import PropTypes__default from 'prop-types';
import throttle from 'lodash.throttle';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.onImageLoaded = _this.onImageLoaded.bind(_this);
    _this.onImageError = _this.onImageError.bind(_this);

    _this.state = {
      showImage: false,
      hasError: false
    };
    return _this;
  }

  _createClass(Image, [{
    key: 'onImageLoaded',
    value: function onImageLoaded() {
      this.setState({
        showImage: true
      });
    }
  }, {
    key: 'onImageError',
    value: function onImageError() {
      this.setState({
        hasError: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          imageSource = _props.imageSource,
          alternateText = _props.alternateText,
          errorImageSource = _props.errorImageSource,
          className = _props.className,
          otherProps = _objectWithoutProperties(_props, ['imageSource', 'alternateText', 'errorImageSource', 'className']);

      var _state = this.state,
          showImage = _state.showImage,
          hasError = _state.hasError;


      var src = errorImageSource && hasError ? errorImageSource : imageSource;

      return React.createElement('img', _extends({
        className: 'fade ' + (showImage ? 'fade-in' : '') + ' ' + className
      }, otherProps, {
        alt: alternateText,
        src: src,
        onLoad: this.onImageLoaded,
        onError: this.onImageError
      }));
    }
  }]);

  return Image;
}(Component);

Image.propTypes = {
  imageSource: PropTypes__default.string.isRequired,
  alternateText: PropTypes__default.string.isRequired,
  errorImageSource: PropTypes__default.string
};

Image.defaultProps = {
  errorImageSource: null
};

var subscribeToScroll = function subscribeToScroll(callback) {
  document.addEventListener('scroll', callback);

  return function () {
    document.removeEventListener('scroll', callback);
  };
};

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties$1(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isWithinViewRange(elementTop, offsetThreshold, window, id) {
  return elementTop - offsetThreshold < window.innerHeight;
}

var LazyImage = function (_Component) {
  _inherits$1(LazyImage, _Component);

  function LazyImage(props) {
    _classCallCheck$1(this, LazyImage);

    //defaut 400ms throttle
    var _this = _possibleConstructorReturn$1(this, (LazyImage.__proto__ || Object.getPrototypeOf(LazyImage)).call(this, props));

    _this.onScroll = throttle(_this.onScrollImpl.bind(_this), 400);

    _this.state = {
      showImage: false
    };
    return _this;
  }

  _createClass$1(LazyImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribeFromScroll = subscribeToScroll(this.onScroll);
      this.onScrollImpl();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribeFromScroll && this.unsubscribeFromScroll();
    }
  }, {
    key: 'onScrollImpl',
    value: function onScrollImpl() {
      var _marker$getBoundingCl = this.marker.getBoundingClientRect(),
          top = _marker$getBoundingCl.top;

      if (isWithinViewRange(top, 0, window, this.props.id)) {
        this.setState({
          showImage: true
        });
        this.unsubscribeFromScroll && this.unsubscribeFromScroll();
        this.unsubscribeFromScroll = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          percentThreshold = _props.percentThreshold,
          imageProps = _objectWithoutProperties$1(_props, ['percentThreshold']);

      var showImage = this.state.showImage;

      return showImage ? React.createElement(Image, imageProps) : React.createElement('div', { ref: function ref(marker) {
          return _this2.marker = marker;
        } });
    }
  }]);

  return LazyImage;
}(Component);

LazyImage.propTypes = _extends$1({}, Image.propTypes, {
  percentThreshold: number
});

LazyImage.defaultProps = _extends$1({}, Image.defaultProps || {}, {
  percentThreshold: 10
});

export { Image, LazyImage };
