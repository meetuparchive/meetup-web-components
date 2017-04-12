import React from 'react';
import cx from 'classnames';
import { MEDIA_SIZES, MEDIA_QUERIES } from '../utils/designConstants';

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
			iconScaleFactor: undefined
		};
	}

	componentDidMount() {

		this.setupListeners = (name, mediaQuery) => {
			if (!window.matchMedia) return;

			const mql = window.matchMedia(mediaQuery);
			mql._fn = function (e) {
				return this.handleMediaChange(e.matches, name);
			}.bind(this);
			mql.addListener(mql._fn);

			return mql;
		};

		this.handleMediaChange = (matches, name) => {
			if (matches) {
				this.changeHandler(name);
			}
		};

		this.changeHandler = (name) => {
			let scaleFactor;

			switch (name) {

			case 'small':
				scaleFactor = 1;
				// console.log('do a small thing');
				break;

			case 'medium':
				scaleFactor = 1.125;
				// console.log('do a medium thing');
				break;

			case 'large':
				scaleFactor = 1.25;
				// console.log('do a large thing');
				break;

			case 'huge':
				scaleFactor = 1.25;
				// console.log('do a huge thing');
				break;

			default:
				break;
			}

			this.setState({
				iconScaleFactor: scaleFactor
			});
		};

		// where the stuff gets called
		for(const mq in MEDIA_QUERIES) {
			this.setupListeners(mq, MEDIA_QUERIES[mq]);

			if (window.matchMedia(MEDIA_QUERIES[mq]).matches) {
				this.changeHandler(mq);
			}
		}

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
		const dim = MEDIA_SIZES[size] * this.state.iconScaleFactor;

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
