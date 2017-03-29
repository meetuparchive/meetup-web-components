import React from 'react';
import cx from 'classnames';

export const VALID_BREAKPOINTS = {
	medium: 'atMedium',
	large: 'atLarge'
};

/**
 * Horizontal Scroll
 * @module Hscroll
 */
class Hscroll extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const {
			gradient,
			unclipAt,
			className,
			children,
			...other
		} = this.props;


		const wrapClassNames = cx(
			{ hscrollGradientWrap: gradient && !unclipAt },
			className
		);

		const hscrollClassNames = cx(
			'hscroll',
			{ [`${VALID_BREAKPOINTS[unclipAt]}_hscroll--unclip`]: !!unclipAt }
		);

		return (
			<div className={wrapClassNames} {...other}>
				<div className={hscrollClassNames}>
					<div className='hscroll-content'>
						{children}
					</div>
				</div>
			</div>
		);
	}
}

Hscroll.propTypes = {
	gradient: React.PropTypes.bool,
	unclipAt: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
};

export default Hscroll;
