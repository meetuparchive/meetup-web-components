import React from 'react';
import cx from 'classnames';

export const SECTION_CLASS = 'section';
export const SECTION_NOSEPARATOR_CLASS = 'section--noSeparator';
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
			noSeparator,
			...other
		} = this.props;

		const noSeparatorBreakpoint = VALID_BREAKPOINTS[noSeparator] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${noSeparatorBreakpoint}_${SECTION_NOSEPARATOR_CLASS}`]: noSeparator,
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
	noSeparator: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
};

export default Section;
