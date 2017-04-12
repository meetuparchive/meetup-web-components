import React from 'react';
import cx from 'classnames';
import {
	MEDIA_SIZES,
	MEDIA_QUERIES,
	BREAKPOINT_MEDIA_SCALE_RATIOS
} from '../utils/designConstants';

export const ICON_CLASS = 'svg';

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
		if (typeof window.matchMedia != 'undefined') {
			this.mediaQueries = {
				medium: window.matchMedia(MEDIA_QUERIES.medium),
				large: window.matchMedia(MEDIA_QUERIES.large),
			};

			const {
				medium,
				large
			} = this.mediaQueries;

			this.handleMediaChange = () => {
				let scaleFactor = 1;

				if (medium.matches) {
					scaleFactor = BREAKPOINT_MEDIA_SCALE_RATIOS.medium;
				}
				if (large.matches) {
					scaleFactor = BREAKPOINT_MEDIA_SCALE_RATIOS.large;
				}

				this.setState({
					iconScaleFactor: scaleFactor
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
