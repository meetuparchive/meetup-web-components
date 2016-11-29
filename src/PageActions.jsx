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

	getChildContext() {
		const { children } = this.props;
		const childrenCount = (children && children.length) ? children.length : 0;
		return {
			pageActionsCount: childrenCount
		};
	};

	render() {
		const {
			className,
			children,
			...other
		} = this.props;



		const classNames = cx(
			'pageActions',
			className
		);



		return (
			<FlexItem
				shrink
				className={classNames}
				{...other}>
					<Flex
						justify='spaceAround'
						>
						{children}
					</Flex>
			</FlexItem>
		);
	}
}

PageActions.childContextTypes = {
	pageActionsCount: React.PropTypes.number
};

PageActions.propTypes = {
};

export default PageActions;
