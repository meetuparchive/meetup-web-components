import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const FLEX_ITEM_CLASS = 'flex-item';
export const FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
export const FLEX_ITEM_GROW_CLASS = 'flex-item--';
export const FLEX_GROW_FACTORS = [1,2,3,4,5,6,7];
/**
 * Design System Component: Provides `FlexItem` styled container for use in `Flex` component containers
 * @module FlexItem
 */
export class FlexItem extends React.Component {
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
			loadingComponent,
			...other
		} = this.props;

		const classNames = cx(
			FLEX_ITEM_CLASS,
			{
				[FLEX_ITEM_SHRINK_CLASS]: shrink,
				[`${FLEX_ITEM_GROW_CLASS}${growFactor}`] : growFactor,
				'component--isLoading': isLoading
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}
			>
				{children}
				{loadingComponent}
			</div>
		);
	}
}

FlexItem.propTypes = {
	shrink: PropTypes.bool,
	growFactor: PropTypes.oneOf(FLEX_GROW_FACTORS),
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string
	})
};

export default withLoading(FlexItem);
