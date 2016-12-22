import React from 'react';
import cx from 'classnames';

/**
 * @module GridList
 */
class GridList extends React.Component {
	render() {
		const {
			children,
			className,
			columns,
			...other
		} = this.props;

		const classNames = cx(
			'gridList',
			{
				[`gridList--has${columns.default}`]: typeof columns.default === 'number',
				[`atMedium_gridList--has${columns.medium}`]: typeof columns.medium === 'number',
				[`atLarge_gridList--has${columns.large}`]: typeof columns.large === 'number'
			},
			className
		);

		return (
			<ul
				className={classNames}
				{...other}>
					{children}
			</ul>
		);
	}
}

GridList.propTypes = {
	columns: React.PropTypes.shape({
		default: React.PropTypes.number.isRequired,
		medium: React.PropTypes.number,
		large: React.PropTypes.number
	})
};

export default GridList;
