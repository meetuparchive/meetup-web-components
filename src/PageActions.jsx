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
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'pageActions',
			className
		);


		const childrenWithProps = React.Children.map(children,
			(child) => React.cloneElement(child, {
				pageActionsCount: children.length || 0
			})
		);

		return (
			<FlexItem
				shrink
				data-count={children.length}
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
