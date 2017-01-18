import React from 'react';
import cx from 'classnames';

/**
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

		const classNames = cx(
			'section',
			{
				noBorder: noBorder
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

Section.propTypes = {
	noBorder: React.PropTypes.bool
};

export default Section;
