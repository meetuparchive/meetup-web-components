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

	static get defaultProps() {
		return {
			direction: 'row'
		};
	}

	getChildContext() {
		const { children, direction } = this.props;
		const childrenCount = (children && children.length) ? children.length : 0;
		return {
			pageActionsDirection: direction,
			pageActionsCount: childrenCount,
		};
	}

	render() {
		const {
			className,
			children,
			direction,
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
						direction={direction}
						justify='spaceAround'
						>
						{children}
					</Flex>
			</FlexItem>
		);
	}
}

PageActions.childContextTypes = {
	pageActionsDirection: React.PropTypes.oneOf([
		'row',
		'column'
	]),
	pageActionsCount: React.PropTypes.number
};

PageActions.propTypes = {
};

export default PageActions;
