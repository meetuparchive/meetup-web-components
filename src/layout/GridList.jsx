import PropTypes from 'prop-types';
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
				{...other}
			>
				{items.map((item, key) =>
					<li key={key} className='gridList-item'>{item}</li>
				)}
			</ul>
		);
	}
}

GridList.propTypes = {
	columns: PropTypes.shape({
		default: PropTypes.number.isRequired,
		medium: PropTypes.number,
		large: PropTypes.number
	}),
	items: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default GridList;
