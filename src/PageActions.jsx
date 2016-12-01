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
		const { children, vertical } = this.props;
		const childrenCount = (children && children.length) ? children.length : 0;
		return {
			pageActionsCount: childrenCount,
			isVertical: vertical
		};
	}

	render() {
		const {
			className,
			children,
			vertical,
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
						direction={vertical ? 'column' : 'row'}
						justify={vertical ? null : 'spaceAround'}
						>
						{children}
					</Flex>
			</FlexItem>
		);
	}
}

PageActions.childContextTypes = {
	isVertical: React.PropTypes.bool,
	pageActionsCount: React.PropTypes.number
};

PageActions.propTypes = {
};

export default PageActions;
