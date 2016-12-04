import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	// Flex,
	FlexItem,
	// Section,
} from './layoutUtils';
/**
 * Navigation item component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module NavItem
 */
class NavItem extends React.Component {
	render() {
		const {
			className,
			children,
			...other
		} = this.props;

		const classNames = cx(
			'align--center',
			className
		);

		return (
			<FlexItem
				shrink
				className={classNames}
				{...other}>
					{children}
			</FlexItem>
		);
	}
}

export default NavItem;
