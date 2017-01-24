import React from 'react';
import cx from 'classnames';
import Flex, {
	DIRECTION_ROW,
	DIRECTION_COLUMN,
} from './Flex';

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
			<Flex
				direction={direction}
				justify='around'
				className={classNames}
				{...other}
			>
				{children}
			</Flex>
		);
	}
}

PageActions.childContextTypes = {
	pageActionsDirection: React.PropTypes.oneOf([
		DIRECTION_ROW,
		DIRECTION_COLUMN
	]),
	pageActionsCount: React.PropTypes.number
};

PageActions.propTypes = {
};

export default PageActions;
