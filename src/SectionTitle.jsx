import React from 'react';
import cx from 'classnames';

/**
 * @module SectionTitle
 */
class SectionTitle extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'sectionTitle',
			'text--display2',
			className
		);

		return (
			<h2
				className={classNames}
				{...other}>
					{children}
			</h2>
		);
	}
}

SectionTitle.propTypes = {
};

export default SectionTitle;
