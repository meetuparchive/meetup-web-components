import React from 'react';
import cx from 'classnames';

/**
 * @module Image
 * simplified from: https://github.com/necolas/react-native-web/blob/master/src/components/Image/index.js
 * full component has a lof of cool things
 */
class Image extends React.Component {
  render() {
    const {
      children,
      className,
      style,
      source,
      ...other
    } = this.props;

    const classNames = cx(
      'image',
      className,
    );

    const resizeMode = this.props.resizeMode || 'cover';
    const backgroundImage = `url('${source}')`;
    return (
      <div
        className={classNames}
        style={{
              ...styles.initial,
              ...style,
              backgroundImage,
              ...resizeModeStyles[resizeMode]
            }}
        {...other}>
        {/* React.createElement('img', {src: source, style: styles.img }) */}
            {children}
      </div>
    );
  }

}

Image.propTypes = {
  resizeMode: React.PropTypes.oneOf(['center', 'contain', 'cover', 'none', 'repeat', 'stretch']),
  source: React.PropTypes.string
};


const styles = {
  initial: {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  img: {
    borderWidth: 0,
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    opacity: 0
  },
  children: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
};

const resizeModeStyles = {
  center: {
    backgroundSize: 'auto',
    backgroundPosition: 'center'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
};

export default Image;
