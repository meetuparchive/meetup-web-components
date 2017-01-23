import React from 'react';
import cx from 'classnames';
import Section from './Section';

/**
 * @module PageHead
 */
class PageHead extends React.Component {
	render() {
		const {
			children,
			className,
			tabs,
			...other
		} = this.props;

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': tabs
			},
			className
		);

		return (
			<Section
				className={classNames}
				{...other}>
					{children}
					{tabs}
			</Section>
		);
	}
}

PageHead.propTypes = {
};

export default PageHead;
