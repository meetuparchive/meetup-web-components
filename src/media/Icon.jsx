import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';
import { VALID_SHAPES } from 'swarm-icons/dist/js/shapeConstants';

export const ICON_CLASS = 'svg';

const SMALL_ICON_VARIANT_WHITELIST = VALID_SHAPES
	.filter(s =>
		!s.startsWith('external') // no third party icons
		&& !s === 'meetup-m'      // logo uses same path for `xs`
	);


/**
 * @param {String} shape - icon shape
 * @param {String} size - icon size
 * @returns {String} icon name (with or without suffix)
 */
export const getIconShape = (shape, size) => {
	if (!SMALL_ICON_VARIANT_WHITELIST.includes(shape)) {
		return shape;
	}
	const suffix = size == 'xs' ? '--small' : '';
	return `${shape}${suffix}`;
};

/**
 * Icon component used to insert an svg icon into a component or page
 *
 * **Accessibility** If an Icon is used on its own without supporting
 * text to explain what it is/does, be a good citizen and pass in an
 * `aria-label` attribute describing what the icon represents
 *
 * @module Icon
 */
class Icon extends React.PureComponent {
	render() {
		const { className, shape, size, ...other } = this.props;

		const classNames = cx(ICON_CLASS, `svg--${shape}`, className);

		const sizeVal = MEDIA_SIZES[size];

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio='xMinYMin meet'
					width={sizeVal}
					height={sizeVal}
					viewBox={`0 0 ${sizeVal} ${sizeVal}`}
					className='svg-icon valign--middle'
					role='img'
					{...other}
				>
					<use xlinkHref={`#icon-${getIconShape(shape, size)}`} />
				</svg>
			</span>
		);
	}
}

Icon.defaultProps = {
	size: 's',
};

Icon.propTypes = {
	shape: PropTypes.oneOf(VALID_SHAPES).isRequired,
	size: PropTypes.oneOf(Object.keys(MEDIA_SIZES)).isRequired,
};

export default Icon;
