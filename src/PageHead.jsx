import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	Flex,
	// FlexItem,
	Section,
} from './layoutUtils';

/**
 * @module PageHead
 */
class PageHead extends React.Component {
	getChildContext() {
		const { children } = this.props;
		const checkForTabs = (element) => {
			return element.type.name === 'Tabs';
		};

		return {
			pageHeadTabs: children.some(checkForTabs)
		};
	}

	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const checkForTabs = (element) => {
			return element.type.name === 'Tabs';
		};

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': children.some(checkForTabs)
			},
			className
		);

		return (
			<Section
				className={classNames}
				{...other}>
					<Flex
						direction='column'
						switchDirection='atMedium'
						>
						{children}
					</Flex>
			</Section>
		);
	}
}

PageHead.childContextTypes = {
	pageHeadTabs: React.PropTypes.bool,
};

PageHead.propTypes = {
};

export default PageHead;
