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

		const alignCapitalized = align == undefined ? null : align.charAt(0).toUpperCase() + align.slice(1);

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
				[`flex--${justify}`]: typeof justify === 'string',
				[`flex--align${alignCapitalized}`]: typeof align === 'string',
				'atSmall_flex--rowReverse': typeof rowReverse === 'boolean',
				[`${rowReverse}_flex--rowReverse`]: typeof rowReverse === 'string',
				'atSmall_flex--columnReverse': typeof columnReverse === 'boolean',
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
		'atSmall',
		'atMedium',
		'atLarge'
	]),
	columnReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf([
			'atSmall',
			'atMedium',
			'atLarge'
		])
	]),
	rowReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf([
			'atSmall',
			'atMedium',
			'atLarge'
		])
	])
};

/**
 * @module FlexItem
 */
class FlexItem extends React.Component {
	render() {
		const {
			children,
			className,
			shrink,
			growFactor,
			...other
		} = this.props;

		const classNames = cx(
			'flex-item',
			{
				'flex-item--shrink': shrink,
				[`flex-item--${growFactor}`] : typeof growFactor === 'number',
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

FlexItem.propTypes = {
	shrink: React.PropTypes.bool,
	growFactor: React.PropTypes.oneOf([1,2,3,4,5,6,7])
};

module.exports = { Flex, FlexItem };
