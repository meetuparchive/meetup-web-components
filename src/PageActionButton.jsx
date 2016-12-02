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
		const switchDirection = () => {
			if (isVertical) {
				return null;
			} else {
				return isShort ? 'atAll' : 'atMedium';
			}

		};

		const classNames = cx(
			'pageActionButton',
			className
		);

		return (
			<Flex
				direction={isVertical ? 'row' : 'column'}
				switchDirection={ switchDirection }
				rowReverse={isVertical ? null : 'atMedium'}
				align={isVertical ? null : 'center'}
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
	isVertical: React.PropTypes.bool,
	pageActionsCount: React.PropTypes.number
};

PageActionButton.propTypes = {
};

export default PageActionButton;
