import PropTypes from 'prop-types';
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
	render() {
		const {
			hasGradient,
			unclipAt,
			className,
			children,
			...other
		} = this.props;


		const wrapClassNames = cx(
			'hscrollContainer',
			{ hscrollGradientWrap: hasGradient && !unclipAt },
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
	hasGradient: PropTypes.bool,
	unclipAt: PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
};

export default Hscroll;
