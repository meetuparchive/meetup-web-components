import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const SECTION_CLASS = 'section';
export const SECTION_HASSEPARATOR_CLASS = 'section--hasSeparator';
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
			noSeparator, // eslint-disable-line no-unused-vars
			hasSeparatorUntil,
			hasSeparator,
			...other
		} = this.props;

		const hasSeparatorUntilBreakpoint = VALID_BREAKPOINTS[hasSeparatorUntil] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${hasSeparatorUntilBreakpoint}_${SECTION_HASSEPARATOR_CLASS} ${SECTION_HASSEPARATOR_CLASS}`]: hasSeparatorUntil,
				[SECTION_HASSEPARATOR_CLASS]: hasSeparator
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
	hasSeparatorUntil: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
	noSeparator: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	])
};

export default Section;
