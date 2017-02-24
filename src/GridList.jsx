import React from 'react';
import cx from 'classnames';

/**
 * @module GridList
 */
class GridList extends React.Component {
	render() {
		const {
			className,
			columns,
			items,
			...other
		} = this.props;

		const classNames = cx(
			'gridList',
			{
				[`gridList--has${columns.default}`]: !!columns.default,
				[`atMedium_gridList--has${columns.medium}`]: !!columns.medium,
				[`atLarge_gridList--has${columns.large}`]: !!columns.large
			},
			className
		);

		return (
			<ul
				className={classNames}
				{...other}>
				{items.map((item, key) =>
					<div key={key} className='gridList-item'>{item}</div>
				)}
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
