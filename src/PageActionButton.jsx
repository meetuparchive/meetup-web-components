import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import {
	Chunk,
	Flex,
	FlexItem,
	// Section,
} from './layoutUtils';

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

		const isShort = this.context.pageActionsCount <= 2;
		const isVertical = this.context.isVertical;

		const classNames = cx(
			'pageActionButton',
			className
		);

		return (
			<Chunk
				className={classNames}
				{...other}>
				<Flex
					direction={isVertical ? 'row' : 'column'}
					switchDirection={ !isVertical && isShort ? 'atAll' : 'atMedium'}
					rowReverse={isVertical ? null : 'atMedium'}
					align={isVertical ? null : 'center'}
					>
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
			</Chunk>
		);
	}
}

PageActionButton.contextTypes = {
	isVertical: React.PropTypes.bool,
	pageActionsCount: React.PropTypes.number
};

PageActionButton.propTypes = {
};

export default PageActionButton;
