// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';
import ConditionalWrap from '../utils/components/ConditionalWrap';

export const GRID_AUTOHEIGHT_CLASS = 'gridList--autoHeight';

type Props = {
	/** Whether the height of the items in the GridList should fill the available height */
	autoHeight?: boolean,

	/** Whether autoheight GridList items should wrap lines */
	autoHeightWithWrap?: boolean,

	/** Columns in the grid at each breakpoint */
	columns: {
		default: number,
		medium?: number,
		large?: number,
	},

	/** Items to render into a grid */
	items: Array<React$Element<*>>,

	/** Class names to add to each item's wrapper */
	itemClassNames?: string,

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},

	/** Nearest DOM element's class name */
	className?: string,

	/** The child elements of the component */
	children: React$Node,
};
/**
 * @module GridListComponent
 */
export class GridListComponent extends React.Component<Props> {
	render() {
		const {
			className,
			columns,
			items,
			autoHeight,
			autoHeightWithWrap,
			itemClassNames,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx(
			'gridList',
			{
				[`gridList--has${columns.default}`]: !!columns.default,
				[`atMedium_gridList--has${columns.medium || 0}`]: !!columns.medium,
				[`atLarge_gridList--has${columns.large || 0}`]: !!columns.large,
			},
			className
		);

		const autoHeightClassNames = cx(
			'flex gridList',
			GRID_AUTOHEIGHT_CLASS,
			{
				'flex--wrap': autoHeightWithWrap,
				[`${GRID_AUTOHEIGHT_CLASS}--has${columns.default}`]: !!columns.default,
				[`atMedium_${GRID_AUTOHEIGHT_CLASS}--has${columns.medium ||
					0}`]: !!columns.medium,
				[`atLarge_${GRID_AUTOHEIGHT_CLASS}--has${columns.large ||
					0}`]: !!columns.large,
			},
			className
		);

		const listItemClassNames = cx('gridList-item', {
			['flex-item']: autoHeight,
			[itemClassNames || '']: Boolean(itemClassNames),
		});

		return (
			<ConditionalWrap
				condition={this.props.children && isLoading}
				wrap={children => (
					<div className="component--isLoading">
						{[children, this.props.children]}
					</div>
				)}
			>
				<ul
					className={
						autoHeight || autoHeightWithWrap
							? autoHeightClassNames
							: classNames
					}
					{...other}
				>
					{items.map((item, key) => (
						<li key={key} className={listItemClassNames}>
							<div className="gridList-itemInner">{item}</div>
						</li>
					))}
				</ul>
			</ConditionalWrap>
		);
	}
}

const GridList = withLoading(GridListComponent);
GridList.displayName = 'GridList';
export default GridList;
