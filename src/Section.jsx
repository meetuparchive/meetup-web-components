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
			bordered,
			...other
		} = this.props;

		const classNames = cx(
			'section',
			{
				bordered: typeof bordered === 'boolean'
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

};

export default Section;
