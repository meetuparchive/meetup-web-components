import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	Flex,
	FlexItem,
	// Section,
} from './layoutUtils';

/**
 * @module PageActions
 */
class PageActions extends React.Component {
	render() {
		const {
			className,
			children,
			...other
		} = this.props;

		const childrenCount = (children && children.length) ? children.length : 0;

		const classNames = cx(
			'pageActions',
			className
		);


		const childrenWithProps = React.Children.map(children,
			(child) => React.cloneElement(child, {
				pageActionsCount: childrenCount
			})
		);

		return (
			<FlexItem
				shrink
				data-count={childrenCount}
				className={classNames}
				{...other}>
					<Flex
						justify='spaceAround'
						>
						{childrenWithProps}
					</Flex>
			</FlexItem>
		);
	}
}

PageActions.propTypes = {
};

export default PageActions;
