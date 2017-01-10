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
				'atAll_flex--rowReverse': typeof rowReverse === 'boolean',
				[`${rowReverse}_flex--rowReverse`]: typeof rowReverse === 'string',
				'atAll_flex--columnReverse': typeof columnReverse === 'boolean',
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
	align: React.PropTypes.oneOf([
		'top',
		'bottom',
		'center',
	]),
	columnReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf([
			'atAll',
			'atMedium',
			'atLarge'
		])
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
	rowReverse: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.oneOf([
			'atAll',
			'atMedium',
			'atLarge'
		])
	]),
	switchDirection: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	]),
	wrap: React.PropTypes.bool
};

export default Flex;
