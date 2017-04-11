import React from 'react';
import cx from 'classnames';

export const FLEX_ITEM_CLASS = 'flex-item';
export const FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
export const FLEX_ITEM_GROW_CLASS = 'flex-item--';
export const FLEX_GROW_FACTORS = [1,2,3,4,5,6,7];
/**
 * Design System Component: Provides `FlexItem` styled container for use in `Flex` component containers
 * @module FlexItem
 */
class FlexItem extends React.Component {
	/**
	 * @return {React.element} the commend form React element
	 */
	render() {
		const {
			children,
			className,
			shrink,
			growFactor,
			...other
		} = this.props;

		const classNames = cx(
			FLEX_ITEM_CLASS,
			{
				[FLEX_ITEM_SHRINK_CLASS]: shrink,
				[`${FLEX_ITEM_GROW_CLASS}${growFactor}`] : growFactor,
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}
			>
				{children}
			</div>
		);
	}
}

FlexItem.propTypes = {
	shrink: React.PropTypes.bool,
	growFactor: React.PropTypes.oneOf(FLEX_GROW_FACTORS),
};

export default FlexItem;
