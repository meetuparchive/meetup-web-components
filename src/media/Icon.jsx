import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES } from '../utils/designConstants';
import { VALID_SHAPES } from 'swarm-icons/dist/js/shapeConstants';

export const ICON_CLASS = 'svg';
export const SVG_THIN_STYLE = '--small';
export const ICON_CIRCLED_CLASS = 'svg--circled';

const SMALL_ICON_VARIANT_WHITELIST = VALID_SHAPES.filter(
	s => !s.startsWith('external') && !s.startsWith('meetup') // no third party icons // logos use same path for `xs`
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

	const suffix =
		size === 'xxs' || size === 'xs' || size === 's' ? SVG_THIN_STYLE : '';
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
			color,
			style,
			circled,
			...other
		} = this.props;

		const classNames = cx(
			ICON_CLASS,
			`svg--${shape}`,
			{ [ICON_CIRCLED_CLASS]: circled },
			className
		);

		const sizeVal = MEDIA_SIZES[size];

		const allStyles = style || {};
		if (color) {
			allStyles.fill = color;
		}

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio="xMinYMin meet"
					width={sizeVal}
					height={sizeVal}
					viewBox={`0 0 ${sizeVal} ${sizeVal}`}
					className="svg-icon valign--middle"
					role="img"
					style={allStyles}
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
	/** The name of the icon shape to render */
	shape: PropTypes.oneOf(VALID_SHAPES).isRequired,

	/** Which of our media sizes to render the icon at */
	size: PropTypes.oneOf(Object.keys(MEDIA_SIZES)).isRequired,

	/** Whether the icon is outlined with a circle */
	circled: PropTypes.bool,

	/** What color the icon should be filled with */
	color: PropTypes.string,
};

export default Icon;
