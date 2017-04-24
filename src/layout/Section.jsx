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
			canBeLastChild,
			...other
		} = this.props;

		const classNames = cx(
			SECTION_CLASS,
			{
				[SECTION_NOBORDER_CLASS]: noBorder,
				[`${VALID_BREAKPOINTS[canBeLastChild]}_${SECTION_CLASS}--canBeLastChild`]: canBeLastChild,
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
	noBorder: React.PropTypes.bool,
	canBeLastChild: React.PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
};

export default Section;
