import React from 'react';
import cx from 'classnames';

/**
 * @module FlexItem
 */
class FlexItem extends React.Component {
	render() {
		const {
			children,
			className,
			shrink,
			growFactor,
			...other
		} = this.props;

		const classNames = cx(
			'flex-item',
			{
				'flex-item--shrink': shrink,
				[`flex-item--${growFactor}`] : typeof growFactor === 'number',
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

FlexItem.propTypes = {
	shrink: React.PropTypes.bool,
	growFactor: React.PropTypes.oneOf([1,2,3,4,5,6,7])
};

export default FlexItem;
