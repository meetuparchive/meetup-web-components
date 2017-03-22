import React from 'react';
import cx from 'classnames';

export const ICON_CLASS = 'svg';

export const MEDIA_SIZES = {
	xs: '16',
	s: '24',
	m: '36',
	l: '48',
	xl: '72',
	auto: '100%',
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
					<use xlinkHref={`#icon-${shape}`}></use>
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
