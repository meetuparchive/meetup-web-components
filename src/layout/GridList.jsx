import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const GRID_AUTOHEIGHT_CLASS = 'gridList--autoHeight';

/**
 * @module GridList
 */
class GridList extends React.Component {
	render() {
		const {
			className,
			columns,
			items,
			autoHeight,
			autoHeightWithWrap,
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

		const autoHeightClassNames = cx(
			'flex gridList',
			GRID_AUTOHEIGHT_CLASS,
			{
				'flex--wrap' : autoHeightWithWrap,
				[`${GRID_AUTOHEIGHT_CLASS}--has${columns.default}`]: !!columns.default,
				[`atMedium_${GRID_AUTOHEIGHT_CLASS}--has${columns.medium}`]: !!columns.medium,
				[`atLarge_${GRID_AUTOHEIGHT_CLASS}--has${columns.large}`]: !!columns.large
			},
			className
		);

		const listItemClassNames = cx(
			'gridList-item',
			{
				['flex-item']: autoHeight
			}
		);

		return (
			<ul
				className={autoHeight || autoHeightWithWrap ? autoHeightClassNames : classNames}
				{...other}
			>
				{items.map((item, key) =>
					<li key={key} className={listItemClassNames}>{item}</li>
				)}
			</ul>
		);
	}
}

GridList.propTypes = {
	autoHeight: PropTypes.bool,
	autoHeightWithWrap: PropTypes.bool,
	columns: PropTypes.shape({
		default: PropTypes.number.isRequired,
		medium: PropTypes.number,
		large: PropTypes.number
	}),
	items: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default GridList;
