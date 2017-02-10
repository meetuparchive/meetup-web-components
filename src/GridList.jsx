import React from 'react';
import cx from 'classnames';

/**
 * @module GridList
 */
class GridList extends React.Component {
	renderItems() {
		this.gridListItems = this.props.items.map((item, i) => {
			return (
				<div
					key={i}
					className='gridList-item'
				>
					{item}
				</div>
			);
		});
		return this.gridListItems;
	}
	render() {
		const {
			className,
			columns,
			items, // eslint-disable-line no-unused-vars
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
					{this.renderItems()}
			</ul>
		);
	}
}

GridList.propTypes = {
	columns: React.PropTypes.shape({
		default: React.PropTypes.number.isRequired,
		medium: React.PropTypes.number,
		large: React.PropTypes.number
	}),
	items: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default GridList;
