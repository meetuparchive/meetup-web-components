import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const SECTION_CLASS = 'section';
export const SECTION_NOSEPARATOR_CLASS = 'section--noSeparator';
export const SECTION_FLUSHUNTIL_CLASS = 'section--flush';
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
			flushUntil,
			...other
		} = this.props;

		const noSeparatorBreakpoint = VALID_BREAKPOINTS[noSeparator] || VALID_BREAKPOINTS['all'];
		const flushUntilBreakpoint = VALID_BREAKPOINTS[flushUntil] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${noSeparatorBreakpoint}_${SECTION_NOSEPARATOR_CLASS}`]: noSeparator,
				[`${flushUntilBreakpoint}_${SECTION_FLUSHUNTIL_CLASS} ${SECTION_FLUSHUNTIL_CLASS}`]: flushUntil
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
	noSeparator: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
	flushUntil: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	])
};

export default Section;
