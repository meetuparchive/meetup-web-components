import React from 'react';
import cx from 'classnames';

/**
 * @module UnevenGrid
 */
class UnevenGrid extends React.Component {
	render() {
		const {
			className,
			lockScroll,
			reverseOrder,
			size,
			columns,
			itemsPerColumn,
			enlargeEvery,
			enlargeFirst,
			...other
		} = this.props;

		const classNames = cx(
			'unevenGrid',
			{
				[`${lockScroll}_unevenGrid--scrollUnclip`]: typeof lockScroll === 'string',
				[`${reverseOrder}_unevenGrid--reverse`]: typeof reverseOrder === 'string',
				[`unevenGrid--${size}`]: typeof size === 'string',
				[`unevenGrid--${columns}columns`]: typeof columns === 'number',
				[`unevenGrid--${itemsPerColumn}perColumn`]: typeof itemsPerColumn === 'number',
				[`unevenGrid--enlargeEvery${enlargeEvery}`]: typeof enlargeEvery === 'number',
				'unevenGrid--enlargeFirst': enlargeFirst
			},
			className
		);

		const children = React.Children.map(this.props.children, (child, i)=>{
			return (
				<li
					className='unevenGrid-item'
					key={i}
				>
					{child}
				</li>
			);
		});

		return (
			<ul
				className={classNames}
				{...other}>
					{children}
			</ul>
		);
	}
}

UnevenGrid.defaultProps = {
	size: 'small',
	columns: 4,
	itemsPerColumn: 2
};

UnevenGrid.propTypes = {
	lockScroll: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	reverseOrder: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	size: React.PropTypes.oneOf([
		'small',
		'large'
	]),
	columns: React.PropTypes.oneOf([1,2,3,4,5,6,7]),
	itemsPerColumn: React.PropTypes.oneOf([2,3,4]),
	enlargeEvery: React.PropTypes.oneOf([3,4,5,6,7]),
	enlargeFirst: React.PropTypes.bool
};

export default UnevenGrid;
