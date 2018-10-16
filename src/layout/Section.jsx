// @flow

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

type Props = {
	/** When to remove the extra bottom padding and bottom border */
	hasSeparatorUntil?: boolean | 'all' | 'medium' | 'large',

	/** Whether to remove the bottom padding and bottom border */
	noSeparator?: boolean | 'all' | 'medium' | 'large',

	/** When to remove the left and right margins */
	flushUntil?: 'all' | 'medium' | 'large',

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},

	/** Nearest DOM element's class name */
	className?: string,

	/** The child elements of the component */
	children: React$Node,

	/** Whether section has a separator or not */
	hasSeparator?: boolean,
};

/**
 * Design System Component: Provides `section` container for components
 * @module SectionComponent
 */
export class SectionComponent extends React.Component<Props> {
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

		let hasSeparatorUntilBreakpoint = '';
		if (typeof hasSeparatorUntil === 'string') {
			hasSeparatorUntilBreakpoint =
				VALID_BREAKPOINTS[hasSeparatorUntil] || VALID_BREAKPOINTS['all'];
		}

		let flushBreakpoint = '';

		if (flushUntil) {
			flushBreakpoint = VALID_BREAKPOINTS[flushUntil] || VALID_BREAKPOINTS['all'];
		}

		const classNames = cx(
			SECTION_CLASS,
			{
				[`${flushBreakpoint}_${SECTION_FLUSH_CLASS} ${SECTION_FLUSH_CLASS}`]:
					flushUntil && flushBreakpoint,
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

const Section = withLoading(SectionComponent);
Section.displayName = 'Section';
export default Section;
