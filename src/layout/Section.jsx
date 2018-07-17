import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const SECTION_CLASS = 'section';
export const SECTION_HASSEPARATOR_CLASS = 'section--hasSeparator';
export const SECTION_NOSEPARATOR_CLASS = 'section--noSeparator';
export const SECTION_FLUSH_CLASS = 'section--flush';
export const VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge',
};

/**
 * Design System Component: Provides `section` container for components
 * @module SectionComponent
 */
export class SectionComponent extends React.Component {
	render() {
		const {
			children,
			className,
			noSeparator, // eslint-disable-line no-unused-vars
			hasSeparatorUntil,
			hasSeparator,
			flushUntil,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const hasSeparatorUntilBreakpoint =
			VALID_BREAKPOINTS[hasSeparatorUntil] || VALID_BREAKPOINTS['all'];
		const flushBreakpoint =
			VALID_BREAKPOINTS[flushUntil] || VALID_BREAKPOINTS['all'];

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${flushBreakpoint}_${SECTION_FLUSH_CLASS} ${SECTION_FLUSH_CLASS}`]: flushUntil,
				[`${hasSeparatorUntilBreakpoint}_${SECTION_HASSEPARATOR_CLASS} ${SECTION_HASSEPARATOR_CLASS}`]: hasSeparatorUntil,
				[SECTION_HASSEPARATOR_CLASS]: hasSeparator,
				'component--isLoading': isLoading,
			},
			className
		);

		return (
			<section className={classNames} {...other}>
				{children}
			</section>
		);
	}
}
SectionComponent.propTypes = {
	/** When to remove the extra bottom padding and bottom border */
	hasSeparatorUntil: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	]),

	/** Whether to remove the bottom padding and bottom border */
	noSeparator: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	]),

	/** When to remove the left and right margins */
	flushUntil: PropTypes.oneOfType([
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	]),

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

export default withLoading(SectionComponent);
