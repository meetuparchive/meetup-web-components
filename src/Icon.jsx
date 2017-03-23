import React from 'react';
import cx from 'classnames';
import { changeSizeWithViewport } from './utils/designConstants';
import MediaListener from './utils/mediaQueryListener';

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
class Icon extends React.Component {
	constructor(props) {
		super(props);

		this._onMediaQueryChange = this._onMediaQueryChange.bind(this);

		this.state = {
			currentBP: undefined
		};
	}

	_onMediaQueryChange(name) {
		this.setState({
			currentBP: name
		});
	}

	componentDidMount() {
		this.mediaListener = new MediaListener(this._onMediaQueryChange);

		// console.log(`getTheBP: ${this.mediaListener.getTheBP()}`);
		// console.log(`getCurrentBP: ${this.mediaListener.getCurrentBP()}`);

		this.setState({
			currentBP: this.mediaListener.getCurrentBP()
		});
	}

	componentWillUnmount() {
		if (this.mediaListener) {
			this.mediaListener.stopListening();
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

		const dim = changeSizeWithViewport(size, this.state.currentBP);

		return (
			<span className={classNames}>
				<svg
					preserveAspectRatio='xMinYMin meet'
					width={dim}
					height={dim}
					viewBox={`0 0 ${dim} ${dim}`}
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
