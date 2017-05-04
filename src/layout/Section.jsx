import React from 'react';
import cx from 'classnames';

export const SECTION_CLASS = 'section';
export const SECTION_NOBORDER_CLASS = 'section--noBorder';
export const VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge',
};

/**
 * Design System Component: Provides `section` container for components
 * @module Section
 */
class Section extends React.Component {
	render() {
		const {
			children,
			className,
			noBorder,
			...other
		} = this.props;

		const noBorderBreakpoint = VALID_BREAKPOINTS[noBorder] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${noBorderBreakpoint}_${SECTION_NOBORDER_CLASS}`]: noBorder,
			},
			className
		);

		return (
			<section
				className={classNames}
				{...other}
			>
				{children}
			</section>
		);
	}
}
Section.propTypes = {
	noBorder: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
};

export default Section;
