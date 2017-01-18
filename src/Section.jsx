import React from 'react';
import cx from 'classnames';

export const SECTION_CLASS = 'section';
export const SECTION_PADDED_CLASS = 'section--padded';
/**
 * Design System Component: Provides `section` container for components
 * @module Section
 */
class Section extends React.Component {
	render() {
		const {
			children,
			className,
			padded,
			...other
		} = this.props;

		const classNames = cx(
			SECTION_CLASS,
			{
				[SECTION_PADDED_CLASS]: padded
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
	padded:React.PropTypes.bool
};

export default Section;
