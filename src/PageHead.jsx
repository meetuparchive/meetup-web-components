import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	// Flex,
	// FlexItem,
	Section,
} from './layoutUtils';

/**
 * @module PageHead
 */
class PageHead extends React.Component {

	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		/*
		const checkForTabs = (element) => {
			return element.type.name === 'Tabs';
		};
		*/

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': this.props.tabs
			},
			className
		);

		return (
			<Section
				className={classNames}
				{...other}>
					{children}
			</Section>
		);
	}
}

PageHead.propTypes = {
};

export default PageHead;
