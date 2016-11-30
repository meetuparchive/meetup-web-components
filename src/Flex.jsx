import React from 'react';
import cx from 'classnames';

/**
 * @module Flex
 */
class Flex extends React.Component {

	static get defaultProps() {
		return {
			direction: 'row'
		};
	}

	render() {
		const {
			direction,
			switchDirection,
			wrap,
			noGutters,
			justify,
			align,
			rowReverse,
			columnReverse,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'flex',
			{
				// horizontal default
				'flex--row' : direction == 'row',
				[`${spread}_flex--column`]: direction == 'row' && typeof switchDirection === 'string',

				// vertical default
				'flex--column': direction == 'column',
				[`${spread}_flex--row`]: direction == 'column' && typeof switchDirection === 'string',

				// other
				'flex--wrap': wrap,
				'flex--noGutters': noGutters,
				[`flex--${justify}`]: typeof justify === 'string',
				[`flex--align-${align}`]: typeof align === 'string',
				[`${rowReverse}_flex--rowReverse`]: typeof rowReverse === 'string',
				[`${columnReverse}_flex--columnReverse`]: typeof columnReverse === 'string',
			}, className);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

Flex.propTypes = {
	wrap: React.PropTypes.bool,
	noGutters: React.PropTypes.bool,
	justify: React.PropTypes.oneOf([
		'center',
		'spaceAround',
		'spaceBetween',
		'flexEnd'
	]),
	align: React.PropTypes.oneOf([
		'top',
		'bottom',
		'center',
	]),
	direction: React.PropTypes.oneOf([
		'row',
		'column'
	]),
	switchDirection: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	columnReverse: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	rowReverse: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	])
};

export default Flex;
