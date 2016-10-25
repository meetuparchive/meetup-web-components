import React from 'react';
import cx from 'classnames';

/**
 * @module Flex
 */
class Flex extends React.Component {
	render() {
		const {
			wrap,
			noGutters,
			justify,
			column,
			spread,
			rowReverse,
			columnReverse,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'flex',
			{
				// horizontal layout
				'flex--wrap': wrap,
				'flex--noGutters': noGutters,
				[`flex--${justify}`]: typeof justify === 'string',

				// vertical layout
				'flex--column': column,

				// media-conditional layout
				'flex--spread' : typeof spread === 'string',
				[`${spread}_flex--spread`]: typeof spread === 'string',
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
	column: React.PropTypes.bool,
	justify: React.PropTypes.oneOf([
		'center',
		'spaceAround',
		'spaceBetween',
		'flexEnd'
	]),
	spread: React.PropTypes.oneOf([
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
