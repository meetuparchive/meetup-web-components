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

		const classNames = cx(
			'pageActionButton',
			className
		);

		return (
			<Chunk
				className={classNames}
				{...other}>
				<Flex
					direction='column'
					switchDirection={ isShort ? 'atAll' : 'atMedium'}
					rowReverse='atMedium'
					align='center'
					>
					{icon &&
						<FlexItem shrink>
							<Icon shape={icon} />
						</FlexItem>
					}
					{label &&
						<FlexItem>
							<div className='text--small text--secondary'>{label}</div>
						</FlexItem>
					}
					{children}
				</Flex>
			</Chunk>
		);
	}
}

PageActionButton.propTypes = {
};

export default PageActionButton;
