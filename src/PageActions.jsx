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

		return (
			<FlexItem
				shrink
				className={classNames}
				{...other}>
					<Flex>
						{children}
					</Flex>
			</FlexItem>
		);
	}
}

PageActions.propTypes = {
};

export default PageActions;
