import React from 'react';
import cx from 'classnames';

/**
 * Design System Component: Provides `Flex` styled container for FlexItems
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
				[`${switchDirection}_flex--column`]: direction == 'row' && typeof switchDirection === 'string',

				// vertical default
				'flex--column': direction == 'column',
				[`${switchDirection}_flex--row`]: direction == 'column' && typeof switchDirection === 'string',

				// other
				'flex--wrap': wrap,
				'flex--noGutters': noGutters,
				[`flex--${justify}`]: justify,
				[`flex--align${align.charAt(0).toUpperCase() + align.slice(1)}`]: align,
				'atAll_flex--rowReverse': rowReverse,
				[`${rowReverse}_flex--rowReverse`]: rowReverseDirection,
				'atAll_flex--columnReverse': columnReverse,
				[`${columnReverse}_flex--columnReverse`]: columnReverseDirection,
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
	align: React.PropTypes.oneOf([
		'top',
		'bottom',
		'center',
	]),
	columnReverse: React.PropTypes.bool,
	columnReverseDirection: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	direction: React.PropTypes.oneOf([
		'row',
		'column'
	]),
	justify: React.PropTypes.oneOf([
		'center',
		'spaceAround',
		'spaceBetween',
		'flexEnd'
	]),
	noGutters: React.PropTypes.bool,
	rowReverse: React.PropTypes.bool,
	rowReverseDirection: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	switchDirection: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	wrap: React.PropTypes.bool
};

export default Flex;
