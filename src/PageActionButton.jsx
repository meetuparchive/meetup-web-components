import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import Flex from './Flex';
import FlexItem from './FlexItem';

/**
 * @module PageActionButton
 */
class PageActionButton extends React.Component {
	render() {
		const {
			children,
			className,
			icon,
			label,
			...other
		} = this.props;


		let direction, align, switchDirection, rowReverse;
		if(this.context.pageActionsDirection == 'column'){
			// this is not in PageHead
			// always a nice column of actions
			// each action is a horizontal icon and label
			direction = 'row';
			align = null;
			switchDirection = null;
			rowReverse = null;
		}
		else{
			// this is in PageHead
			// actions in a row,
			// adjust to take up space based on position and numbers
			const isShort = this.context.pageActionsCount <= 2;
			direction = 'column';
			align = null;
			switchDirection = isShort ? 'atAll' : 'atMedium';
			rowReverse = isShort ? 'atMedium' : null;
		}

		const classNames = cx(
			'pageActionButton',
			className
		);

		return (
			<Flex
				direction={direction}
				switchDirection={switchDirection}
				rowReverse={rowReverse}
				align={align}
				className={classNames}
				{...other}>
				{icon &&
					<FlexItem shrink className='valign--middle'>
						<Icon shape={icon} />
					</FlexItem>
				}
				{label &&
					<FlexItem className='valign--middle'>
						<div className='text--small text--secondary'>{label}</div>
					</FlexItem>
				}
				{children}
			</Flex>
		);
	}
}

PageActionButton.contextTypes = {
	pageActionsDirection: React.PropTypes.oneOf([
		'row',
		'column'
	]),
	pageActionsCount: React.PropTypes.number
};

PageActionButton.propTypes = {
};

export default PageActionButton;
