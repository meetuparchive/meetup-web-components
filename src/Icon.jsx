import React from 'react';
import cx from 'classnames';

export const ICON_CLASS = 'svg';

export const MEDIA_SIZES = {
	xs: '16',
	s: '24',
	m: '36',
	l: '48',
	xl: '72',
};

const spritePath = require('file!swarm-icons/dist/sprite/sprite.inc');

/**
 * Icon component used to insert an svg icon into a component or page
 *
 * **Accessibility** If an Icon is used on its own without supporting
 * text to explain what it is/does, be a good citizen and pass in an
 * `aria-label` attribute describing what the icon represents
 *
 * @module Icon
 */
class Icon extends React.Component {

	render() {
		const {
			className,
			shape,
			size,
			...other
		} = this.props;

		const classNames = cx(
			ICON_CLASS,
			`svg--${shape}`,
			className
		);

		const dim = MEDIA_SIZES[size];

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio='xMinYMin meet'
					width={dim}
					height={dim}
					viewBox={`0 0 ${dim} ${dim}`}
					className='svg-icon valign--middle'
					role='img'
					aria-labelledby={`${shape}_title`}
					{...other}>
					<title id={`${shape}_title`} />
					<use role='presentation' xlinkHref={`${spritePath}#icon-${shape}`} />
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
	size: React.PropTypes.oneOf(Object.keys(MEDIA_SIZES))
};

export default Icon;
