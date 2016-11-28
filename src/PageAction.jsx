import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import {
	// Chunk,
	Flex,
	FlexItem,
	// Section,
} from './layoutUtils';

/**
 * @module PageAction
 */
class PageAction extends React.Component {
	render() {
		const {
			children,
			className,
			pageActionsCount,
			icon,
			label,
			...other
		} = this.props;

		const isShort = pageActionsCount <= 2;

		const classNames = cx(
			'pageAction',
			className,
		);

		return (
			<FlexItem
				className={classNames}
				shrink
				{...other}>
					<Flex
						spread={ isShort ? 'atAll' : 'atMedium'}
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
					</Flex>
					{children}
			</FlexItem>
		);
	}
}

PageAction.propTypes = {
};

export default PageAction;
