import React from 'react';
import cx from 'classnames';
import {
	MEDIA_SIZES,
	MEDIA_QUERIES,
	BREAKPOINT_MEDIA_SCALE_RATIOS
} from '../utils/designConstants';

export const ICON_CLASS = 'svg';

/**
 * Returns a multiplier to use for scaling an Icon based on viewport size
 *
 * @param {Object} mediaMatches - `matches` boolean values by `is${breakpoint}` key
 * @returns {Number} - scale factor
 */
export const getScaleFactor = mediaMatches => {
	let scaleFactor = 1;

	if (mediaMatches.isMedium && mediaMatches.isMedium) {
		scaleFactor = BREAKPOINT_MEDIA_SCALE_RATIOS.medium;
	}
	if (mediaMatches.isLarge && mediaMatches.isLarge) {
		scaleFactor = BREAKPOINT_MEDIA_SCALE_RATIOS.large;
	}

	return scaleFactor;
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
	constructor(props){
		super(props);

		this.state = {
			iconScaleFactor: 1
		};
	}

	componentDidMount() {
		if (window.matchMedia) {
			this.mediaQueries = {
				medium: window.matchMedia(MEDIA_QUERIES.medium),
				large: window.matchMedia(MEDIA_QUERIES.large),
			};

			this.handleMediaChange = () => {
				this.setState({
					iconScaleFactor: getScaleFactor({
						isMedium: this.mediaQueries.medium.matches,
						isLarge: this.mediaQueries.large.matches
					})
				});
			};

			this.handleMediaChange();
			Object.keys(this.mediaQueries).forEach(mq => {
				this[`listen_${mq}`] = this.mediaQueries[mq].addListener(this.handleMediaChange);
			});
		}
	}

	componentWillUnmount() {
		Object.keys(this.mediaQueries).forEach(mq => {
			this.mediaQueries[mq] && this.mediaQueries[mq].removeListener(this.handleMediaChange);
		});
	}

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
		const dim = Math.floor(MEDIA_SIZES[size] * this.state.iconScaleFactor);

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
	size: 's'
};

Icon.propTypes = {
	shape: React.PropTypes.string.isRequired,
	size: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'auto'])
};

export default Icon;
