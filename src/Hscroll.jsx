import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import rafSchedule from 'raf-schd';

export const HIDE_GRADIENT_CLASSNAME = 'hscrollGradient--hidden';

export const VALID_BREAKPOINTS = {
	medium: 'atMedium',
	large: 'atLarge',
};

/**
 * Horizontal Scroll
 * @module Hscroll
 */
class Hscroll extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onScroll = this.onScroll.bind(this);

		this.state = {
			isScrolled: false,
		};
	}

	onScroll(e) {
		const { scrollLeft } = e.target;
		rafSchedule(this.setState(() => ({ isScrolled: Boolean(scrollLeft) })));
	}

	render() {
		const { hasGradient, unclipAt, className, children, ...other } = this.props;

		const wrapClassNames = cx(
			'hscrollContainer',
			{
				hscrollGradientWrap: hasGradient && !unclipAt,
				[HIDE_GRADIENT_CLASSNAME]: this.state.isScrolled,
			},
			className
		);

		const hscrollClassNames = cx('hscroll', {
			[`${VALID_BREAKPOINTS[unclipAt]}_hscroll--unclip`]: !!unclipAt,
		});

		return (
			<div onScroll={this.onScroll} className={wrapClassNames} {...other}>
				<div className={hscrollClassNames}>
					<div className="hscroll-content">{children}</div>
				</div>
			</div>
		);
	}
}

Hscroll.propTypes = {
	/** Whether the beginning and end of the scrolling element disappears into a gradient instead of being abruptly cut off */
	hasGradient: PropTypes.bool,

	/** Breakpoint at which to render the items without a horizontal scroll */
	unclipAt: PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
};

export default Hscroll;
