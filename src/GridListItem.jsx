import React from 'react';
import cx from 'classnames';

/**
 * @module GridListItem
 */
class GridListItem extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'gridList-item',
			className
		);

		return (
			<li
				className={classNames}
				{...other}>
					{children}
			</li>
		);
	}
}

GridListItem.propTypes = {
};

export default GridListItem;
