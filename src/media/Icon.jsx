import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';

export const ICON_CLASS = 'svg';

/**
 * @param {String} shape - icon shape
 * @param {String} size - icon size
 * @returns {String} icon name (with or without suffix)
 */
export const getIconShape = (shape, size) => {

	// third party icons (yahoo, facebook, etc) do not have small variants
	if (shape.includes('external')) {
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
		const {
			className,
			shape,
			size,
			...other
		} = this.props;

		const generatedShape = getIconShape(shape, size);

		const classNames = cx(
			ICON_CLASS,
			`svg--${shape}`,
			className
		);

		const viewBox = size === 'auto' ? MEDIA_SIZES['xl'] : MEDIA_SIZES[size];
		const dim = MEDIA_SIZES[size];

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio='xMinYMin meet'
					width={dim}
					height={dim}
					viewBox={`0 0 ${viewBox} ${viewBox}`}
					className='svg-icon valign--middle'
					role='img'
					{...other}>
					<use xlinkHref={`#icon-${generatedShape}`}></use>
				</svg>
			</span>
		);
	}
}

Icon.defaultProps = {
	size: 'm'
};

Icon.propTypes = {
	shape: React.PropTypes.string.isRequired,
	size: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'auto'])
};

export default Icon;
