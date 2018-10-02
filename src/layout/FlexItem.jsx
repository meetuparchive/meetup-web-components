// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const FLEX_ITEM_CLASS = 'flex-item';
export const FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
export const FLEX_ITEM_GROW_CLASS = 'flex-item--';
export const FLEX_GROW_FACTORS = [1, 2, 3, 4, 5, 6, 7];
/**
 * Design System Component: Provides `FlexItem` styled container for use in `Flex` component containers
 * @module FlexItemComponent
 */

type Props = {
	/** Whether the flex item should shrink to the size of it's content */
	shrink?: boolean,

	/** Proportion of flex item's size compared to sibling flex items */
	growFactor?: 1 | 2 | 3 | 4 | 5 | 6 | 7,

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
	/** The child elements of the component */
	children: React$Element<*>,

	/** Nearest DOM element's class name */
	className?: string,
};
export class FlexItemComponent extends React.Component<Props> {
	/**
	 * @return {React.element} the commend form React element
	 */
	render() {
		const {
			children,
			className,
			shrink,
			growFactor,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx(
			FLEX_ITEM_CLASS,
			{
				[FLEX_ITEM_SHRINK_CLASS]: shrink,
				// $FlowFixMe
				[`${FLEX_ITEM_GROW_CLASS}${growFactor}`]: growFactor,
				'component--isLoading': isLoading,
			},
			className
		);

		return (
			<div className={classNames} {...other}>
				{children}
			</div>
		);
	}
}

const FlexItem = withLoading(FlexItemComponent);
FlexItem.displayName = 'FlexItem';
export default FlexItem;
